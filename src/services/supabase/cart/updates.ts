
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    // Get the user's cart
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();
      
    if (cartError || !cart) {
      console.error('Error finding cart:', cartError);
      return false;
    }
    
    // Delete all items in the cart
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);
      
    if (error) throw error;
    
    toast.success('Cart cleared');
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    toast.error('Failed to clear cart');
    return false;
  }
};
