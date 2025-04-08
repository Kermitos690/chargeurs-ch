
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0";

serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Récupération du corps de la requête sous forme de texte
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Signature Stripe manquante" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Vérification de la signature Stripe avec le webhook secret
    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET_RENTAL');
    
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

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    console.log('Webhook Stripe reçu:', event.type);

    // Traitement des événements Stripe liés aux locations
    if (event.type === 'setup_intent.succeeded') {
      const setupIntent = event.data.object;
      
      // Récupération de la location associée
      const { data: rentalData, error: rentalError } = await supabaseAdmin
        .from('rentals')
        .select('*')
        .eq('stripe_setup_intent_id', setupIntent.id)
        .single();

      if (rentalError || !rentalData) {
        console.error('Location non trouvée pour setupIntent:', setupIntent.id);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      // Mise à jour du statut de la location
      await supabaseAdmin
        .from('rentals')
        .update({
          status: 'active',
          start_time: new Date().toISOString(),
          payment_method_id: setupIntent.payment_method
        })
        .eq('id', rentalData.id);

      console.log('Location activée:', rentalData.id);
    } 
    else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Si le paiement concerne une location (vérification via les métadonnées)
      if (paymentIntent.metadata && paymentIntent.metadata.rentalId) {
        const rentalId = paymentIntent.metadata.rentalId;
        
        // Enregistrement du paiement réussi
        await supabaseAdmin
          .from('rental_payments')
          .insert({
            rental_id: rentalId,
            payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Conversion depuis les centimes
            status: 'succeeded'
          });
          
        console.log('Paiement de location enregistré:', paymentIntent.id, 'pour location:', rentalId);
      }
    }
    else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      
      if (paymentIntent.metadata && paymentIntent.metadata.rentalId) {
        const rentalId = paymentIntent.metadata.rentalId;
        
        // Enregistrement de l'échec de paiement
        await supabaseAdmin
          .from('rental_payments')
          .insert({
            rental_id: rentalId,
            payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            status: 'failed',
            error_message: paymentIntent.last_payment_error?.message || 'Échec de paiement'
          });
          
        console.log('Échec de paiement enregistré:', paymentIntent.id, 'pour location:', rentalId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors du traitement du webhook de location:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
