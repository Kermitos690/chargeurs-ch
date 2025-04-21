
import { getCartItems, clearCart } from './cart';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const createCheckoutSession = async (successUrl?: string, cancelUrl?: string) => {
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
    }));

    const defaultSuccessUrl = `${window.location.origin}/shop/checkout-success`;
    const defaultCancelUrl = `${window.location.origin}/shop/checkout-cancel`;

    // Appeler l'API Stripe via la fonction Edge de Supabase
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { 
        items,
        successUrl: successUrl || defaultSuccessUrl,
        cancelUrl: cancelUrl || defaultCancelUrl
      }
    });

    if (error) {
      console.error('Erreur lors de la création de la session:', error);
      throw new Error(error.message);
    }

    if (data?.url) {
      // Rediriger vers l'URL de paiement Stripe
      window.location.href = data.url;
      return { success: true };
    } else {
      throw new Error('Aucune URL de redirection n\'a été reçue');
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
    
    // Vous pourriez également vérifier le statut de la session auprès de Stripe
    // et mettre à jour votre base de données en conséquence
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors du traitement du succès du paiement:', error);
    return { success: false, error: error.message };
  }
};

// Voici un exemple de fonctions supplémentaires que vous pourriez vouloir implémenter:

// Récupérer les détails d'une commande
export const getOrderDetails = async (orderId: string) => {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id, name, image_url
          ),
          product_variants (
            id, name, image_url
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError) throw orderError;
    
    return { success: true, order };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la commande:', error);
    return { success: false, error: error.message };
  }
};

// Récupérer les commandes d'un utilisateur
export const getUserOrders = async (userId: string) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, orders };
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return { success: false, error: error.message };
  }
};
