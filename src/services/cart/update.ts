
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { removeCartItem } from './remove';

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
