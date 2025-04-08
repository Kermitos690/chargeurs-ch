
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateCart } from './session';

/**
 * Ajoute un produit au panier
 */
export const addToCart = async (productId: string, quantity: number = 1, variantId?: string): Promise<boolean> => {
  try {
    // Vérifier l'utilisateur courant
    const { data: { user } } = await supabase.auth.getUser();
    
    // Obtenir ou créer un panier
    const cart = await getOrCreateCart(user?.id);
    
    if (!cart) {
      toast.error('Impossible de créer un panier');
      return false;
    }
    
    // Obtenir le prix du produit
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price, sale_price')
      .eq('id', productId)
      .single();
      
    if (productError) {
      console.error('Erreur lors de la récupération du produit:', productError);
      toast.error('Produit introuvable');
      return false;
    }
    
    // Utiliser le prix de vente s'il existe, sinon le prix normal
    let price = product.sale_price || product.price;
    
    // Vérifier si une variante est spécifiée et obtenir son prix
    if (variantId) {
      const { data: variant, error: variantError } = await supabase
        .from('product_variants')
        .select('price')
        .eq('id', variantId)
        .single();
        
      if (!variantError && variant && variant.price) {
        price = variant.price;
      }
    }
    
    // Vérifier si l'article existe déjà dans le panier
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null);
      
    if (fetchError) {
      console.error('Erreur lors de la recherche dans le panier:', fetchError);
      toast.error('Erreur lors de l\'ajout au panier');
      return false;
    }
    
    if (existingItems && existingItems.length > 0) {
      // Mettre à jour la quantité si l'article existe
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItems[0].quantity + quantity })
        .eq('id', existingItems[0].id);
        
      if (updateError) {
        console.error('Erreur lors de la mise à jour du panier:', updateError);
        toast.error('Erreur lors de la mise à jour du panier');
        return false;
      }
    } else {
      // Ajouter un nouvel article s'il n'existe pas
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: productId,
          variant_id: variantId || null,
          quantity,
          price_at_add: price
        });
        
      if (insertError) {
        console.error('Erreur lors de l\'ajout au panier:', insertError);
        toast.error('Erreur lors de l\'ajout au panier');
        return false;
      }
    }
    
    toast.success('Article ajouté au panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    toast.error('Impossible d\'ajouter l\'article au panier');
    return false;
  }
};
