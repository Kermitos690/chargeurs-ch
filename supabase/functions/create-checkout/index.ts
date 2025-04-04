
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
    const { priceId, items, successUrl, cancelUrl, useTerminal } = await req.json();

    // Vérification des paramètres requis
    if (!items || !items.length) {
      return new Response(
        JSON.stringify({ error: 'Les articles sont requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Préparation des line_items pour Stripe Checkout
    const lineItems = items.map((item: { id: string, quantity: number, price: number, name: string, stripeProductId?: string }) => {
      // Utiliser l'ID de produit Stripe s'il existe, sinon créer un price_data dynamique
      if (item.stripeProductId) {
        return {
          price_data: {
            currency: 'chf',
            product: item.stripeProductId,
            unit_amount: Math.round(item.price * 100), // Conversion en centimes
          },
          quantity: item.quantity,
        };
      } else {
        return {
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
        };
      }
    });

    // Configuration de base de la session
    const sessionConfig = {
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
    };

    // Si l'option terminal est demandée, configurer pour le terminal Stripe (WISE PAD 3)
    if (useTerminal === true) {
      // Configuration spécifique pour le terminal
      sessionConfig.payment_method_types = ['card_present'];
      
      // Créer d'abord une Payment Intent pour le terminal
      const paymentIntent = await stripe.paymentIntents.create({
        amount: lineItems.reduce((total, item) => total + (item.price_data.unit_amount * item.quantity), 0),
        currency: 'chf',
        payment_method_types: ['card_present'],
        capture_method: 'automatic',
      });
      
      // Retourner les détails du Payment Intent pour le traitement via WISE PAD 3
      return new Response(
        JSON.stringify({ 
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          requiresTerminal: true 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Création d'une session Stripe Checkout standard
      const session = await stripe.checkout.sessions.create(sessionConfig);

      // Retour de l'URL de redirection vers Stripe Checkout
      return new Response(
        JSON.stringify({ url: session.url }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Erreur lors de la création de la session Checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
