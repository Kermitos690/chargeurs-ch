
import { supabase } from '@/integrations/supabase/client';

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user;
};

export const createPaymentIntent = async (amount: number, metadata: any = {}) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount, metadata }
    });
    
    if (error) throw error;
    
    return { success: true, clientSecret: data.clientSecret };
  } catch (error: any) {
    console.error('Erreur lors de la création du payment intent:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la création du paiement' 
    };
  }
};

export const processRentalPayment = async (amount: number, powerBankId: string, stationId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Vous devez être connecté pour effectuer cette action' };
    }
    
    const { data, error } = await supabase.functions.invoke('create-rental-payment', {
      body: { 
        amount, 
        powerBankId, 
        stationId, 
        userId: user.id 
      }
    });
    
    if (error) throw error;
    
    return { success: true, ...data };
  } catch (error: any) {
    console.error('Erreur lors du traitement du paiement de location:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors du traitement du paiement' 
    };
  }
};

/**
 * Subscribe a user to a subscription plan
 * @param planId The plan ID to subscribe to (basic, premium, enterprise)
 * @returns A response object with success status and URL for checkout or error message
 */
export const subscribeToPlan = async (planId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Vous devez être connecté pour souscrire à un abonnement' };
    }
    
    // Call the Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke('create-subscription', {
      body: { 
        planId,
        userId: user.id 
      }
    });
    
    if (error) throw error;
    
    // If the response contains a URL, redirect the user to the checkout page
    if (data.url) {
      window.location.href = data.url;
      return { success: true };
    }
    
    throw new Error('URL de checkout manquante dans la réponse');
  } catch (error: any) {
    console.error('Erreur lors de la souscription à l\'abonnement:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la souscription à l\'abonnement' 
    };
  }
};
