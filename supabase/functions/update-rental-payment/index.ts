
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialisation de Stripe avec la clé secrète
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Récupération des données de la requête
    const { rentalId, endStationId, finalAmount } = await req.json();

    console.log('Finalisation de paiement pour location:', { rentalId, endStationId, finalAmount });

    // Vérification des paramètres requis
    if (!rentalId || !endStationId || finalAmount === undefined) {
      return new Response(
        JSON.stringify({ error: 'Paramètres manquants pour la finalisation du paiement' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialisation du client Supabase
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Récupération des informations de la location
    const { data: rentalData, error: rentalError } = await supabaseAdmin
      .from('rentals')
      .select('*, profiles(stripe_customer_id)')
      .eq('id', rentalId)
      .single();

    if (rentalError || !rentalData) {
      console.error('Erreur lors de la récupération des informations de location:', rentalError);
      return new Response(
        JSON.stringify({ error: 'Location introuvable' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (rentalData.status === 'completed') {
      return new Response(
        JSON.stringify({ error: 'Cette location est déjà finalisée', alreadyProcessed: true }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const customerId = rentalData.profiles?.stripe_customer_id;
    
    if (!customerId) {
      return new Response(
        JSON.stringify({ error: 'Données de paiement client introuvables' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Récupération des méthodes de paiement du client
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    if (!paymentMethods.data.length) {
      return new Response(
        JSON.stringify({ error: 'Aucune méthode de paiement disponible pour ce client' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Création d'un paiement pour le montant final
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Conversion en centimes
      currency: 'chf',
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      description: `Location Powerbank - ${rentalData.rental_reference}`,
      metadata: {
        rentalId: rentalId,
        rentalRef: rentalData.rental_reference
      }
    });

    // Mise à jour de la location dans la base de données
    const { data: updatedRental, error: updateError } = await supabaseAdmin
      .from('rentals')
      .update({
        status: 'completed',
        end_station_id: endStationId,
        end_time: new Date().toISOString(),
        final_amount: finalAmount,
        stripe_payment_intent_id: paymentIntent.id
      })
      .eq('id', rentalId)
      .select()
      .single();

    if (updateError) {
      console.error('Erreur lors de la mise à jour de la location:', updateError);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la mise à jour de la location' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Retour des informations de paiement
    return new Response(
      JSON.stringify({
        success: true,
        paymentIntentId: paymentIntent.id,
        amount: finalAmount,
        rental: updatedRental
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la finalisation du paiement de location:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
