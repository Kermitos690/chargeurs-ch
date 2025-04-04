
import axios from 'axios';
import { toast } from 'sonner';
import { auth } from './firebase';
import { Subscription } from '@/types/api';

// API endpoints for Stripe integration
const STRIPE_API_ENDPOINT = 'https://api.example.com/stripe'; // Replace with your actual endpoint

// Create a checkout session for subscription
export const createCheckoutSession = async (priceId: string, successUrl?: string, cancelUrl?: string) => {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    
    if (!idToken) {
      throw new Error('Vous devez être connecté pour souscrire à un abonnement.');
    }
    
    const response = await axios.post(
      `${STRIPE_API_ENDPOINT}/create-checkout-session`, 
      {
        priceId,
        successUrl: successUrl || window.location.origin + '/subscription/success',
        cancelUrl: cancelUrl || window.location.origin + '/subscription/cancel',
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    
    if (response.data?.url) {
      window.location.href = response.data.url;
      return { success: true };
    } else {
      throw new Error('Impossible de créer la session de paiement.');
    }
  } catch (error: any) {
    console.error('Erreur lors de la création de la session Stripe:', error);
    toast.error(error.message || 'Une erreur est survenue lors du traitement du paiement.');
    return { success: false, error: error.message };
  }
};

// Check subscription status for current user
export const checkSubscriptionStatus = async () => {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    
    if (!idToken) {
      return { success: false, error: 'Non authentifié' };
    }
    
    const response = await axios.get(
      `${STRIPE_API_ENDPOINT}/subscription-status`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    
    return { 
      success: true, 
      data: response.data 
    };
  } catch (error: any) {
    console.error('Erreur lors de la vérification de l\'abonnement:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Subscribe to a plan directly from the UI
export const subscribeToPlan = async (subscriptionId: string) => {
  try {
    const subscription = await getSubscriptionDetails(subscriptionId);
    
    if (!subscription) {
      throw new Error('Abonnement non trouvé');
    }
    
    // Create checkout session with the price ID
    return await createCheckoutSession(subscription.priceId);
  } catch (error: any) {
    console.error('Erreur lors de la souscription:', error);
    toast.error(error.message || 'Une erreur est survenue lors de la souscription.');
    return { success: false, error: error.message };
  }
};

// Cancel current subscription
export const cancelSubscription = async () => {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    
    if (!idToken) {
      throw new Error('Vous devez être connecté pour annuler votre abonnement.');
    }
    
    const response = await axios.post(
      `${STRIPE_API_ENDPOINT}/cancel-subscription`,
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    
    if (response.data?.success) {
      toast.success('Votre abonnement a été annulé avec succès.');
      return { success: true };
    } else {
      throw new Error(response.data?.error || 'Impossible d\'annuler l\'abonnement.');
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'annulation de l\'abonnement:', error);
    toast.error(error.message || 'Une erreur est survenue lors de l\'annulation.');
    return { success: false, error: error.message };
  }
};

// Get subscription details by ID
const getSubscriptionDetails = async (subscriptionId: string): Promise<Subscription | null> => {
  try {
    // This would typically be fetched from your backend or database
    // For now, we'll use the mock data
    const subscriptions = [
      {
        id: 'basic',
        name: 'Abonnement Basic',
        description: 'Pour une utilisation occasionnelle',
        price: 9.90,
        priceId: 'price_basic123', // Stripe Price ID
        features: ['2 locations gratuites par mois', 'Tarif préférentiel: 1 CHF/heure', 'Support par email'],
        duration: 'monthly' as const
      },
      {
        id: 'premium',
        name: 'Abonnement Premium',
        description: 'Pour une utilisation régulière',
        price: 19.90,
        priceId: 'price_premium123', // Stripe Price ID
        features: ['5 locations gratuites par mois', 'Tarif préférentiel: 0.80 CHF/heure', 'Support prioritaire', 'Réservation de powerbank'],
        duration: 'monthly' as const
      },
      {
        id: 'enterprise',
        name: 'Abonnement Entreprise',
        description: 'Pour les équipes et entreprises',
        price: 49.90,
        priceId: 'price_enterprise123', // Stripe Price ID
        features: ['Locations illimitées par mois', 'Tarif fixe: 0.50 CHF/heure', 'Support dédié 24/7', 'Facturation mensuelle', 'Powerbanks personnalisées'],
        duration: 'monthly' as const
      }
    ];
    
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    return subscription || null;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'abonnement:', error);
    return null;
  }
};
