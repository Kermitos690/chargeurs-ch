
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Met à jour la quantité d'un article dans le panier
 */
export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
  try {
    if (quantity <= 0) {
      return removeCartItem(itemId);
    }
    
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
      
    if (error) {
      console.error('Erreur lors de la mise à jour du panier:', error);
      toast.error('Impossible de mettre à jour le panier');
      return false;
    }
    
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
export const removeCartItem = async (itemId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
      
    if (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      toast.error('Impossible de supprimer l\'article');
      return false;
    }
    
    toast.success('Article supprimé du panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    toast.error('Impossible de supprimer l\'article');
    return false;
  }
};
