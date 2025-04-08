
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateCart } from '@/services/supabase/cart/types';

export const addToCart = async (productId: string, quantity: number = 1, variantId?: string) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter des articles au panier');
      return false;
    }
    
    // Get or create cart
    const cart = await getOrCreateCart(user.id);
    
    if (!cart) {
      toast.error('Impossible de créer un panier');
      return false;
    }
    
    // Get product price
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price')
      .eq('id', productId)
      .single();
      
    if (productError) throw productError;
    
    // Get variant price if applicable
    let price = product.price;
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
    
    // Check if the item already exists in the cart
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null);
      
    if (fetchError) throw fetchError;
    
    if (existingItems && existingItems.length > 0) {
      // Update quantity if item exists
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItems[0].quantity + quantity })
        .eq('id', existingItems[0].id);
        
      if (updateError) throw updateError;
    } else {
      // Add new item if it doesn't exist
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: productId,
          variant_id: variantId || null,
          quantity,
          price_at_add: price
        });
        
      if (insertError) throw insertError;
    }
    
    toast.success('Article ajouté au panier');
    return true;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    toast.error('Impossible d\'ajouter l\'article au panier');
    return false;
  }
};
