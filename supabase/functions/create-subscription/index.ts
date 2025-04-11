
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@13.1.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define price IDs for each plan
const PLAN_PRICE_IDS = {
  basic: "price_basic", // Replace with your actual Stripe price IDs
  premium: "price_premium",
  enterprise: "price_enterprise"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Get the user session
    const userToken = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      userToken
    );

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Get request body
    const { planId } = await req.json();
    
    if (!planId || !PLAN_PRICE_IDS[planId as keyof typeof PLAN_PRICE_IDS]) {
      throw new Error("Plan ID invalid");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if user already has Stripe customer ID
    const { data: profileData } = await supabaseClient
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profileData?.stripe_customer_id;

    // If no customer ID exists, create a new customer in Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Update user profile with Stripe customer ID
      await supabaseClient
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Create a checkout session for the subscription
    const priceId = PLAN_PRICE_IDS[planId as keyof typeof PLAN_PRICE_IDS];
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/account?subscription_success=true`,
      cancel_url: `${req.headers.get("origin")}/subscriptions?subscription_canceled=true`,
      metadata: {
        user_id: user.id,
        plan_id: planId,
      },
    });

    // Return checkout URL
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
