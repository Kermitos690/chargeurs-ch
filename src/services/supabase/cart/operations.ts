
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateCart } from './types';

export const getCartItems = async (userId: string | undefined) => {
  if (!userId) return [];
  
  try {
    // First get or create a cart for this user
    const cart = await getOrCreateCart(userId);
    
    if (!cart) {
      return [];
    }
    
    // Now get the items in this cart
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*), variant:product_variants(*)')
      .eq('cart_id', cart.id);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    toast.error('Unable to fetch cart items.');
    return [];
  }
};

export const addToCart = async (userId: string | undefined, productId: string, quantity: number, variantId?: string) => {
  if (!userId) {
    toast.error('You must be logged in to add items to cart');
    return false;
  }
  
  try {
    // Get or create cart
    const cart = await getOrCreateCart(userId);
    
    if (!cart) {
      toast.error('Could not create cart');
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
    
    toast.success('Item added to cart');
    return true;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    toast.error('Failed to add item to cart');
    return false;
  }
};
