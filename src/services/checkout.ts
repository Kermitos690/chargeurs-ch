
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
      // Le stripeProductId n'existe pas dans le type retourné par getCartItems()
      // Nous devons l'ajouter manuellement pour les produits d'accessoires
      stripeProductId: null // On ne peut pas utiliser la propriété qui n'existe pas dans le type
    }));

    // Pour les accessoires, on peut chercher le stripeProductId via les données statiques
    // Cette solution temporaire permet de faire fonctionner le code sans modifier le type
    try {
      const { data: accessoriesModule } = await import('@/data/accessories');
      if (accessoriesModule && accessoriesModule.accessories) {
        const accessories = accessoriesModule.accessories;
        
        // Mettre à jour les items avec les stripeProductId des accessoires
        items.forEach(item => {
          const accessory = accessories.find(acc => acc.id === item.id);
          if (accessory && accessory.stripeProductId) {
            item.stripeProductId = accessory.stripeProductId;
          }
        });
      }
    } catch (error) {
      console.log('Impossible de charger les données des accessoires:', error);
    }

    // Appeler l'API Stripe via la fonction Edge de Supabase
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { 
        items,
        successUrl,
        cancelUrl,
        useTerminal
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.requiresTerminal && data?.clientSecret) {
      // Retourner les détails pour le terminal
      return { 
        success: true, 
        requiresTerminal: true, 
        clientSecret: data.clientSecret,
        paymentIntentId: data.paymentIntentId
      };
    } else if (data?.url) {
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

// Procéder au paiement via terminal WISE PAD 3
export const processTerminalPayment = async (paymentIntentId: string) => {
  try {
    // Appeler l'API pour traiter le paiement via terminal
    const { data, error } = await supabase.functions.invoke('process-terminal-payment', {
      body: { 
        paymentIntentId
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erreur lors du traitement du paiement via terminal:', error);
    toast.error('Une erreur est survenue lors du traitement du paiement');
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
