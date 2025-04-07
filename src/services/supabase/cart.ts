
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

// Helper function to get or create a cart
async function getOrCreateCart(userId: string) {
  try {
    // Check if user already has a cart
    const { data: existingCarts, error: fetchError } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (fetchError) throw fetchError;
    
    // If cart exists, return it
    if (existingCarts) {
      return existingCarts;
    }
    
    // Create a new cart
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();
      
    if (createError) throw createError;
    
    return newCart;
  } catch (error) {
    console.error('Error getting or creating cart:', error);
    return null;
  }
}

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

export const calculateCartTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);
};
