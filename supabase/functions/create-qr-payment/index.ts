
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
    const { userId, amount, description, expiresIn = 120, metadata = {} } = await req.json();
    
    // Vérification des paramètres requis
    if (!userId || !amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Paramètres invalides pour la création du QR code' }),
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

    // Récupération de l'email de l'utilisateur depuis auth.users si nécessaire
    let userEmail = userData.email;
    if (!userEmail) {
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
      if (authError || !authUser?.user?.email) {
        return new Response(
          JSON.stringify({ error: 'Email utilisateur introuvable' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userEmail = authUser.user.email;
    }

    // Obtention ou création de l'ID client Stripe
    let customerId = userData.stripe_customer_id;
    
    if (!customerId) {
      // Création d'un nouveau client Stripe si nécessaire
      const customer = await stripe.customers.create({
        email: userEmail,
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

    // Création d'une session de paiement QR Code
    const paymentLinkObject = {
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: description || 'Pré-autorisation pour location',
            },
            unit_amount: Math.round(amount * 100), // Conversion en centimes
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customerId,
      expires_at: Math.floor(Date.now() / 1000) + expiresIn, // Expiration en secondes depuis l'époque
      metadata: {
        ...metadata,
        userId: userId
      }
    };

    // Création du lien de paiement
    const paymentLink = await stripe.paymentLinks.create(paymentLinkObject);

    // Récupération du QR code
    const qrCode = await stripe.paymentLinks.retrieveQrCode(paymentLink.id);

    // Retour des informations nécessaires pour afficher le QR code
    return new Response(
      JSON.stringify({
        qrCodeUrl: qrCode.url,
        sessionId: paymentLink.id,
        expiresAt: paymentLinkObject.expires_at
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de la création du QR code de paiement:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
