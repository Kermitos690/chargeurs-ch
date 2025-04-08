
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
    const { userId, powerBankId, stationId, maxAmount } = await req.json();

    console.log('Création de pré-autorisation pour location:', { userId, powerBankId, stationId, maxAmount });

    // Vérification des paramètres requis
    if (!userId || !powerBankId || !stationId || !maxAmount) {
      return new Response(
        JSON.stringify({ error: 'Paramètres manquants pour la création du paiement' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialisation du client Supabase
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Récupération des informations de l'utilisateur
    const { data: userData, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Erreur lors de la récupération des informations utilisateur:', userError);
      return new Response(
        JSON.stringify({ error: 'Utilisateur introuvable' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Obtention ou création de l'ID client Stripe
    let customerId = userData.stripe_customer_id;
    
    if (!customerId) {
      // Création d'un nouveau client Stripe si nécessaire
      const customer = await stripe.customers.create({
        email: userData.email,
        metadata: {
          userId: userId
        }
      });
      
      customerId = customer.id;
      
      // Sauvegarde de l'ID client Stripe dans la base de données
      await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Création d'une méthode de paiement hors session pour la pré-autorisation
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    // Génération d'un numéro de référence unique pour la location
    const rentalRef = `PWB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Création d'un enregistrement de location dans la base de données
    const { data: rentalData, error: rentalError } = await supabaseAdmin
      .from('rentals')
      .insert({
        user_id: userId,
        power_bank_id: powerBankId,
        start_station_id: stationId,
        status: 'pending_payment',
        max_amount: maxAmount,
        rental_reference: rentalRef,
        stripe_setup_intent_id: setupIntent.id
      })
      .select()
      .single();

    if (rentalError) {
      console.error('Erreur lors de la création de la location:', rentalError);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la création de la location' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Retour des informations nécessaires pour finaliser le paiement côté client
    return new Response(
      JSON.stringify({
        setupIntentId: setupIntent.id,
        clientSecret: setupIntent.client_secret,
        rentalId: rentalData.id,
        rentalRef: rentalRef
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la création du paiement de location:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
