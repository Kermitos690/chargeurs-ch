
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

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(
      JSON.stringify({ error: "Signature Stripe manquante" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Récupération du corps de la requête sous forme de texte
    const body = await req.text();
    
    // Vérification de la signature Stripe avec le webhook secret
    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    let event;
    
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.error(`Erreur de signature webhook: ${err.message}`);
        return new Response(
          JSON.stringify({ error: `Erreur de signature webhook: ${err.message}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Si pas de secret configuré, utiliser le corps directement (non recommandé en production)
      event = JSON.parse(body);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || ''
    );

    // Traitement des événements Stripe
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Création d'une nouvelle commande
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: `ORD-${Date.now()}`,
          user_id: session.client_reference_id, // Si disponible
          total_amount: session.amount_total / 100, // Conversion depuis les centimes
          shipping_address: session.shipping_details,
          billing_address: session.billing_details,
          payment_intent_id: session.payment_intent,
          payment_method: session.payment_method_types[0],
          status: 'processing',
        })
        .select('id')
        .single();

      if (orderError) {
        console.error("Erreur lors de la création de la commande:", orderError);
        return new Response(
          JSON.stringify({ error: "Erreur lors de la création de la commande" }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Récupération des détails de la session pour obtenir les line items
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );

      // Création des éléments de commande
      const orderItems = lineItems.data.map(item => ({
        order_id: orderData.id,
        product_id: item.price?.metadata?.productId, // À adapter selon votre structure
        quantity: item.quantity,
        price: item.amount_total / 100, // Conversion depuis les centimes
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) {
        console.error("Erreur lors de la création des éléments de commande:", orderItemsError);
        return new Response(
          JSON.stringify({ error: "Erreur lors de la création des éléments de commande" }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors du traitement du webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
