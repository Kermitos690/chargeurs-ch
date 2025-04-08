
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
    const { items, successUrl, cancelUrl } = await req.json();

    // Vérification des paramètres requis
    if (!items || !items.length) {
      return new Response(
        JSON.stringify({ error: 'Les articles sont requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Préparation des line_items pour Stripe Checkout
    const lineItems = items.map((item: { id: string, quantity: number, price: number, name: string }) => ({
      price_data: {
        currency: 'chf',
        product_data: {
          name: item.name,
          metadata: {
            productId: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Conversion en centimes
      },
      quantity: item.quantity,
    }));

    // Création de la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'twint'], // Inclusion de TWINT comme méthode de paiement
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/checkout/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CH'], // Suisse uniquement
      },
      phone_number_collection: {
        enabled: true,
      },
      locale: 'fr', // Interface en français
      allow_promotion_codes: true,
      metadata: {
        orderId: crypto.randomUUID(),
      },
    });

    // Retour de l'URL de redirection vers Stripe Checkout
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur lors de la création de la session Checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
