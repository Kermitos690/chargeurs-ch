
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CartItem } from './types';
import { getOrCreateSessionId, initializeCart } from './session';

// Ajouter un article au panier
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
    const { data: existingItem, error: fetchError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

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

// Mettre à jour la quantité d'un article
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

// Supprimer un article du panier
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
