
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateSessionId } from './session';

/**
 * Vide complètement le panier d'un utilisateur
 */
export const clearCart = async (userId?: string): Promise<boolean> => {
  try {
    // Trouver le panier approprié
    let cartQuery = supabase.from('carts').select('id');
    
    if (userId) {
      cartQuery = cartQuery.eq('user_id', userId);
    } else {
      const sessionId = getOrCreateSessionId();
      cartQuery = cartQuery.eq('session_id', sessionId);
    }
    
    const { data: carts, error: cartError } = await cartQuery;
    
    if (cartError || !carts || carts.length === 0) {
      console.error('Erreur ou panier introuvable:', cartError);
      return false;
    }
    
    // Supprimer tous les articles du panier
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', carts[0].id);
      
    if (error) {
      console.error('Erreur lors du vidage du panier:', error);
      toast.error('Impossible de vider le panier');
      return false;
    }
    
    toast.success('Panier vidé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    toast.error('Impossible de vider le panier');
    return false;
  }
};
