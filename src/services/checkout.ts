
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const createCheckoutSession = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('You must be logged in to checkout');
      return { success: false };
    }
    
    // Get cart items
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('*, product:products(*), variant:product_variants(*)')
      .eq('user_id', user.id);
      
    if (cartError) throw cartError;
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return { success: false };
    }
    
    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: calculateTotal(cartItems),
        status: 'pending',
        order_number: generateOrderNumber()
      })
      .select()
      .single();
      
    if (orderError) throw orderError;
    
    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      price: item.variant ? item.variant.price : item.product.price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
      
    if (itemsError) throw itemsError;
    
    // Clear cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);
      
    // Redirect to success page (this would normally go to stripe)
    window.location.href = '/checkout/success';
    return { success: true };
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast.error('Failed to process checkout');
    return { success: false };
  }
};

const calculateTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
