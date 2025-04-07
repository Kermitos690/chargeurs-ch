
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateSessionId } from './session';

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
