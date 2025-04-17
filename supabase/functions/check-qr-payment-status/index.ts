
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
    console.log("Function check-qr-payment-status started");
    
    // Initialisation de Stripe avec la clé secrète
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
    if (!stripeSecretKey) {
      console.error("Stripe secret key not found in environment variables");
      return new Response(
        JSON.stringify({ error: 'Configuration Stripe manquante' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Récupération des données de la requête
    const { sessionId } = await req.json();
    
    // Vérification du paramètre requis
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'ID de session manquant' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Checking payment link status for: ${sessionId}`);
    
    // Récupération des informations sur le lien de paiement
    const paymentLink = await stripe.paymentLinks.retrieve(sessionId);
    
    // Récupération des paiements associés au lien
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 5,
      payment_link: sessionId
    });
    
    let status = 'pending';
    let paymentDetails = null;
    
    // Vérification du statut des paiements
    if (paymentIntents.data.length > 0) {
      const latestPayment = paymentIntents.data[0];
      
      if (latestPayment.status === 'succeeded') {
        status = 'paid';
        paymentDetails = {
          id: latestPayment.id,
          amount: latestPayment.amount / 100,
          currency: latestPayment.currency,
          payment_method: latestPayment.payment_method
        };
      } else if (latestPayment.status === 'canceled' || latestPayment.status === 'failed') {
        status = 'failed';
      }
    }
    
    // Si aucun paiement n'est trouvé, vérifier si le lien est actif ou expiré
    if (status === 'pending') {
      const now = Math.floor(Date.now() / 1000);
      if (paymentLink.expires_at && paymentLink.expires_at < now) {
        status = 'expired';
      }
    }
    
    console.log(`Payment status for ${sessionId}: ${status}`);
    
    // Vérifier si des métadonnées de rentalId sont présentes
    if (status === 'paid' && paymentLink.metadata && paymentLink.metadata.rentalId) {
      const rentalId = paymentLink.metadata.rentalId;
      
      // Initialisation du client Supabase
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      
      if (supabaseUrl && supabaseServiceKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        
        // Mettre à jour le statut de la location
        console.log(`Updating rental status for ID: ${rentalId}`);
        const { error: updateError } = await supabaseAdmin
          .from('rentals')
          .update({
            status: 'active',
            start_time: new Date().toISOString(),
            payment_method_id: paymentDetails?.payment_method
          })
          .eq('id', rentalId);
          
        if (updateError) {
          console.error('Erreur lors de la mise à jour du statut de la location:', updateError);
        } else {
          console.log(`Rental ${rentalId} activated successfully`);
        }
      }
    }

    // Retour des informations sur le statut du paiement
    return new Response(
      JSON.stringify({
        status,
        paymentDetails
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la vérification du statut QR:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
