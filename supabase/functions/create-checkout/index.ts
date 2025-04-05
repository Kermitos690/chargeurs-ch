
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
    // Récupération du corps de la requête
    const { items, successUrl, cancelUrl, useTerminal = false } = await req.json();

    // Validation des données d'entrée
    if (!items || !items.length) {
      return new Response(
        JSON.stringify({ error: 'Panier vide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialisation de Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    if (useTerminal) {
      // Créer un paiement via terminal (pour les paiements en personne)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) * 100),
        currency: 'chf',
        payment_method_types: ['card_present'],
        capture_method: 'automatic',
      });

      return new Response(
        JSON.stringify({
          requiresTerminal: true,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Créer une session de paiement standard
      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'chf',
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convertir en centimes
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl || `${req.headers.get('origin')}/shop/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${req.headers.get('origin')}/shop/checkout-cancel`,
      });

      return new Response(
        JSON.stringify({ url: session.url }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
