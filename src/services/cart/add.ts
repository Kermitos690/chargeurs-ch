
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { initializeCart } from './session';

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
