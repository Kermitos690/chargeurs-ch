
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateSessionId, initializeCart } from './session';
import { CartItem } from './types';

/**
 * Ajoute un article au panier
 */
export const addToCart = async (
  productId: string, 
  quantity: number = 1, 
  price: number, 
  variantId?: string, 
  userId?: string
) => {
  try {
    const cartId = await initializeCart(userId);
    if (!cartId) throw new Error('Erreur lors de l\'initialisation du panier');

    // Vérifier si l'article existe déjà dans le panier
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null);

    if (fetchError) throw fetchError;
    
    const existingItem = existingItems && existingItems.length > 0 ? existingItems[0] : null;

    if (existingItem) {
      // Mettre à jour la quantité si l'article existe déjà
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);

      if (updateError) throw updateError;
      
      toast.success('Article ajouté au panier');
      return true;
    } else {
      // Ajouter un nouvel article sinon
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: productId,
          variant_id: variantId || null,
          quantity,
          price_at_add: price,
        });

      if (insertError) throw insertError;
      
      toast.success('Article ajouté au panier');
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    toast.error('Impossible d\'ajouter l\'article au panier');
    return false;
  }
};

/**
 * Récupère le contenu du panier
 */
export const getCartItems = async (userId?: string): Promise<CartItem[]> => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la requête de manière sécurisée
    let cartQuery = supabase.from('carts').select('id');
    
    if (userId) {
      cartQuery = cartQuery.eq('user_id', userId);
    } else {
      cartQuery = cartQuery.eq('session_id', sessionId);
    }
    
    // D'abord, trouver l'ID du panier
    const { data: carts, error: cartError } = await cartQuery;

    if (cartError) throw cartError;
    
    const cart = carts && carts.length > 0 ? carts[0] : null;
    if (!cart) return [];

    // Ensuite, récupérer les articles du panier avec les détails des produits
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        price_at_add,
        products (
          id,
          name,
          slug,
          image_url,
          price,
          sale_price
        ),
        product_variants (
          id,
          name,
          image_url,
          price,
          attributes
        )
      `)
      .eq('cart_id', cart.id);

    if (itemsError) throw itemsError;

    return cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      priceAtAdd: item.price_at_add,
      product: {
        id: item.products.id,
        name: item.products.name,
        slug: item.products.slug,
        imageUrl: item.products.image_url,
        price: item.products.sale_price || item.products.price,
        regularPrice: item.products.price,
      },
      variant: item.product_variants ? {
        id: item.product_variants.id,
        name: item.product_variants.name,
        imageUrl: item.product_variants.image_url,
        price: item.product_variants.price,
        attributes: typeof item.product_variants.attributes === 'string' 
          ? JSON.parse(item.product_variants.attributes) 
          : item.product_variants.attributes,
      } : null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    toast.error('Impossible de récupérer le contenu du panier');
    return [];
  }
};

/**
 * Met à jour la quantité d'un article dans le panier
 */
export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      // Si la quantité est 0 ou moins, supprimer l'article
      return removeCartItem(itemId);
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) throw error;
    
    toast.success('Panier mis à jour');
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    toast.error('Impossible de mettre à jour le panier');
    return false;
  }
};

/**
 * Supprime un article du panier
 */
export const removeCartItem = async (itemId: string) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    
    toast.success('Article supprimé du panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    toast.error('Impossible de supprimer l\'article');
    return false;
  }
};

/**
 * Vide le panier
 */
export const clearCart = async (userId?: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la requête de manière sécurisée
    let cartQuery = supabase.from('carts').select('id');
    
    if (userId) {
      cartQuery = cartQuery.eq('user_id', userId);
    } else {
      cartQuery = cartQuery.eq('session_id', sessionId);
    }
    
    // Trouver l'ID du panier
    const { data: carts, error: cartError } = await cartQuery;

    if (cartError) throw cartError;
    
    const cart = carts && carts.length > 0 ? carts[0] : null;
    if (!cart) return true;

    // Supprimer tous les articles du panier
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (deleteError) throw deleteError;
    
    toast.success('Panier vidé');
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    toast.error('Impossible de vider le panier');
    return false;
  }
};
