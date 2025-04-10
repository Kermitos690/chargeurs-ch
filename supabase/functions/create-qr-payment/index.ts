
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.16.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Configuration pour le mode test Stripe
const STRIPE_MODE = "test"; // "test" ou "live"
const TEST_SUCCESS_URL = "https://checkout.stripe.com/c/pay/cs_test_a1zL7WvAgZkIwDr8NOlEywqeLXpdLWfELbtxLFAMPVmB1XqSxPIODohIkC#fidkdWxOYHwnPyd1blpxYHZxWjA0TjE0PW9fTEBTVE11QzVPNTVoaEpANDBNQWdcYSc%2FXXBJYn1CdEYzU3dSYzM1V3ZKZGNyNmNgMWlRNTU2VWRsUnRXTmFNfGlOMGR%2FQHJIPENKSVxhaycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";

serve(async (req) => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Function create-qr-payment started");
    
    // Initialisation de Stripe avec la clé secrète
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
    if (!stripeSecretKey) {
      console.error("Stripe secret key not found in environment variables");
      return new Response(
        JSON.stringify({ error: 'Configuration Stripe manquante' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Using Stripe in ${STRIPE_MODE} mode`);
    const stripe = new Stripe(stripeSecretKey, {
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables");
      return new Response(
        JSON.stringify({ error: 'Configuration Supabase manquante' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Récupération des informations de l'utilisateur
    console.log(`Looking up user profile for ID: ${userId}`);
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
      console.log("Email not found in profile, looking up in auth.users");
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
      if (authError || !authUser?.user?.email) {
        console.error("Failed to get email from auth.users:", authError);
        return new Response(
          JSON.stringify({ error: 'Email utilisateur introuvable' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userEmail = authUser.user.email;
      console.log(`Found email in auth.users: ${userEmail}`);
    }

    // Obtention ou création de l'ID client Stripe
    let customerId = userData.stripe_customer_id;
    
    if (!customerId) {
      console.log("No Stripe customer ID found, creating a new customer");
      // Création d'un nouveau client Stripe si nécessaire
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId
        }
      });
      
      customerId = customer.id;
      console.log(`Created new Stripe customer: ${customerId}`);
      
      // Sauvegarde de l'ID client Stripe dans la base de données
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
        
      if (updateError) {
        console.error("Failed to update profile with Stripe customer ID:", updateError);
      }
    } else {
      console.log(`Using existing Stripe customer: ${customerId}`);
    }

    // Création d'une session de paiement QR Code
    console.log(`Creating payment link for amount: ${amount} CHF`);
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
        userId: userId,
        test_mode: STRIPE_MODE === "test" ? true : false
      }
    };

    // Ajouter une URL de succès de test si en mode test
    if (STRIPE_MODE === "test") {
      console.log("Using test success URL for demo purposes");
      paymentLinkObject.success_url = TEST_SUCCESS_URL;
    }

    // Création du lien de paiement
    const paymentLink = await stripe.paymentLinks.create(paymentLinkObject);
    console.log(`Payment link created: ${paymentLink.id}`);

    // Récupération du QR code
    console.log("Retrieving QR code for payment link");
    const qrCode = await stripe.paymentLinks.retrieveQrCode(paymentLink.id);

    // Retour des informations nécessaires pour afficher le QR code
    return new Response(
      JSON.stringify({
        qrCodeUrl: qrCode.url,
        sessionId: paymentLink.id,
        expiresAt: paymentLinkObject.expires_at,
        testMode: STRIPE_MODE === "test"
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
