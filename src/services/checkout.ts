
import { getCartItems, clearCart } from './cart';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Créer une session de checkout Stripe
export const createCheckoutSession = async (successUrl?: string, cancelUrl?: string, useTerminal?: boolean) => {
  try {
    // Récupérer les articles du panier
    const cartItems = await getCartItems();
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return { success: false };
    }

    // Préparer les articles pour Stripe
    const items = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name + (item.variant ? ` - ${item.variant.name}` : ''),
      price: item.variant?.price || item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl
    }));

    // Simuler un appel à la fonction Edge Stripe
    if (useTerminal) {
      // Simuler une réponse pour le terminal
      return { 
        success: true, 
        requiresTerminal: true, 
        clientSecret: 'dummy_client_secret',
        paymentIntentId: 'dummy_payment_intent_id'
      };
    } else {
      // Simuler une URL de paiement Stripe
      // En production, cette URL serait obtenue de la fonction Edge
      const checkoutUrl = '/shop/checkout-success';
      window.location.href = checkoutUrl;
      return { success: true };
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    toast.error('Une erreur est survenue lors de la préparation du paiement');
    return { success: false, error: error.message };
  }
};

// Gérer le succès du paiement
export const handleCheckoutSuccess = async (sessionId: string) => {
  try {
    // Vider le panier après un paiement réussi
    await clearCart();
    return { success: true };
  } catch (error) {
    console.error('Erreur lors du traitement du succès du paiement:', error);
    return { success: false, error: error.message };
  }
};

// Procéder au paiement via terminal
export const processTerminalPayment = async (paymentIntentId: string) => {
  try {
    // Simuler le traitement du paiement via terminal
    console.log('Traitement du paiement via terminal:', paymentIntentId);
    
    return { success: true, data: { status: 'succeeded' } };
  } catch (error) {
    console.error('Erreur lors du traitement du paiement via terminal:', error);
    toast.error('Une erreur est survenue lors du traitement du paiement');
    return { success: false, error: error.message };
  }
};
