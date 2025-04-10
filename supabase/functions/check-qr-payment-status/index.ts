
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0";

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
    const { sessionId } = await req.json();
    
    // Vérification des paramètres requis
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'ID de session manquant' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Récupération des informations de la session de paiement
    const paymentLink = await stripe.paymentLinks.retrieve(sessionId);
    
    // Vérification si le lien a expiré
    const now = Math.floor(Date.now() / 1000);
    if (paymentLink.expires_at && paymentLink.expires_at < now) {
      return new Response(
        JSON.stringify({ status: 'expired' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Récupération des sessions de checkout associées au lien de paiement
    const checkoutSessions = await stripe.checkout.sessions.list({
      payment_link: sessionId
    });
    
    if (checkoutSessions.data.length === 0) {
      return new Response(
        JSON.stringify({ status: 'pending' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Vérification du statut du premier checkout (le plus récent)
    const latestCheckout = checkoutSessions.data[0];
    
    if (latestCheckout.status === 'complete') {
      return new Response(
        JSON.stringify({ 
          status: 'completed',
          checkoutId: latestCheckout.id,
          paymentIntentId: latestCheckout.payment_intent
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (latestCheckout.status === 'expired' || latestCheckout.status === 'open') {
      return new Response(
        JSON.stringify({ status: 'pending' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ status: 'canceled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du statut du paiement:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
