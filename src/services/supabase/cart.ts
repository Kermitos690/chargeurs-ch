
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const getCartItems = async (userId: string | undefined) => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*), variant:product_variants(*)')
      .eq('user_id', userId);
      
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
    // Check if the item already exists in the cart
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
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
          user_id: userId,
          product_id: productId,
          variant_id: variantId || null,
          quantity
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

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating cart item:', error);
    toast.error('Failed to update cart');
    return false;
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
      
    if (error) throw error;
    
    toast.success('Item removed from cart');
    return true;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    toast.error('Failed to remove item');
    return false;
  }
};

export const clearCart = async (userId: string | undefined) => {
  if (!userId) return false;
  
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
      
    if (error) throw error;
    
    toast.success('Cart cleared');
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    toast.error('Failed to clear cart');
    return false;
  }
};

export const calculateCartTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);
};
