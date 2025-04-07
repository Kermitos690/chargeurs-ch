
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateSessionId } from './session';

/**
 * Transfère le panier d'une session à un utilisateur (lors de la connexion)
 */
export const transferCartToUser = async (userId: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Trouver le panier de session
    const { data: sessionCarts, error: sessionCartError } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', sessionId);

    if (sessionCartError) throw sessionCartError;
    
    const sessionCart = sessionCarts && sessionCarts.length > 0 ? sessionCarts[0] : null;
    if (!sessionCart) return true; // Pas de panier de session, rien à transférer

    // Trouver un panier existant pour l'utilisateur
    const { data: userCarts, error: userCartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId);

    if (userCartError) throw userCartError;
    
    const userCart = userCarts && userCarts.length > 0 ? userCarts[0] : null;

    if (userCart) {
      // Si l'utilisateur a déjà un panier, fusionner les articles
      // D'abord, récupérer les articles du panier de session
      const { data: sessionItems, error: itemsError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', sessionCart.id);

      if (itemsError) throw itemsError;

      // Pour chaque article du panier de session
      for (const item of sessionItems) {
        // Vérifier si cet article existe déjà dans le panier de l'utilisateur
        const { data: existingItems, error: existingItemError } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('cart_id', userCart.id)
          .eq('product_id', item.product_id)
          .eq('variant_id', item.variant_id);

        if (existingItemError) throw existingItemError;
        
        const existingItem = existingItems && existingItems.length > 0 ? existingItems[0] : null;

        if (existingItem) {
          // Mettre à jour la quantité de l'article existant
          await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + item.quantity })
            .eq('id', existingItem.id);
        } else {
          // Ajouter l'article au panier de l'utilisateur
          await supabase
            .from('cart_items')
            .insert({
              ...item,
              id: undefined, // Pour générer un nouvel ID
              cart_id: userCart.id,
            });
        }
      }

      // Supprimer le panier de session
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', sessionCart.id);

      await supabase
        .from('carts')
        .delete()
        .eq('id', sessionCart.id);

    } else {
      // Si l'utilisateur n'a pas de panier, convertir le panier de session
      await supabase
        .from('carts')
        .update({ user_id: userId, session_id: null })
        .eq('id', sessionCart.id);
    }

    // Supprimer l'ID de session du localStorage
    localStorage.removeItem('cart_session_id');
    
    return true;
  } catch (error) {
    console.error('Erreur lors du transfert du panier:', error);
    return false;
  }
};
