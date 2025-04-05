
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper pour générer un ID de session pour les utilisateurs non connectés
const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

// Initialiser un panier
export const initializeCart = async (userId?: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Simuler la recherche d'un panier existant
    let existingCart = null;
    
    if (!existingCart) {
      // Simuler la création d'un nouveau panier
      return "new-cart-id";
    }

    return "existing-cart-id";
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du panier:', error);
    toast.error('Impossible d\'initialiser le panier');
    return null;
  }
};

// Ajouter un article au panier
export const addToCart = async (
  productId: string, 
  quantity: number = 1, 
  price: number, 
  variantId?: string
) => {
  try {
    const cartId = await initializeCart();
    if (!cartId) throw new Error('Erreur lors de l\'initialisation du panier');

    // Simulation d'ajout au panier
    console.log(`Article ajouté au panier: ${productId}, quantité: ${quantity}, prix: ${price}`);
    
    toast.success('Article ajouté au panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    toast.error('Impossible d\'ajouter l\'article au panier');
    return false;
  }
};

// Récupérer le contenu du panier
export const getCartItems = async () => {
  try {
    // Simuler des articles dans le panier
    return accessories.map(acc => ({
      id: acc.id,
      quantity: 1,
      priceAtAdd: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
      product: {
        id: acc.id,
        name: acc.name,
        slug: `accessoire-${acc.id}`,
        imageUrl: acc.image,
        price: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
        regularPrice: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
      },
      variant: null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    toast.error('Impossible de récupérer le contenu du panier');
    return [];
  }
};

// Mettre à jour la quantité d'un article
export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      // Si la quantité est 0 ou moins, supprimer l'article
      return removeCartItem(itemId);
    }

    // Simuler la mise à jour de la quantité
    console.log(`Quantité mise à jour pour l'article ${itemId}: ${quantity}`);
    
    toast.success('Panier mis à jour');
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    toast.error('Impossible de mettre à jour le panier');
    return false;
  }
};

// Supprimer un article du panier
export const removeCartItem = async (itemId: string) => {
  try {
    // Simuler la suppression d'un article
    console.log(`Article supprimé du panier: ${itemId}`);
    
    toast.success('Article supprimé du panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    toast.error('Impossible de supprimer l\'article');
    return false;
  }
};

// Vider le panier
export const clearCart = async () => {
  try {
    // Simuler le vidage du panier
    console.log('Panier vidé');
    
    toast.success('Panier vidé');
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    toast.error('Impossible de vider le panier');
    return false;
  }
};

// Calculer le total du panier
export const calculateCartTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    const price = item.variant?.price || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

// Temporaire: importer les accessoires pour la simulation
import { accessories } from '@/data/accessories';
