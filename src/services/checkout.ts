
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const createCheckoutSession = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour finaliser votre achat');
      return { success: false };
    }
    
    // Get cart items - specify explicit type to avoid deep type instantiation
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product:products(id, name, price),
        variant:product_variants(id, name, price)
      `)
      .eq('cart_id', await getCartIdForUser(user.id));
      
    if (cartError) throw cartError;
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Votre panier est vide');
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
      product_id: item.product.id,
      variant_id: item.variant?.id || null,
      quantity: item.quantity,
      price: item.variant ? item.variant.price : item.product.price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
      
    if (itemsError) throw itemsError;
    
    // Clear cart
    const { error: clearCartError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', await getCartIdForUser(user.id));
      
    if (clearCartError) throw clearCartError;
      
    // Redirect to success page (this would normally go to stripe)
    window.location.href = '/checkout/success';
    return { success: true };
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast.error('Échec du traitement de la commande');
    return { success: false };
  }
};

// Helper function to get or create a cart for a user
async function getCartIdForUser(userId: string): Promise<string> {
  // Check if user already has a cart
  const { data: existingCart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
    
  if (existingCart) {
    return existingCart.id;
  }
  
  // Create new cart if none exists
  const { data: newCart, error } = await supabase
    .from('carts')
    .insert({ user_id: userId })
    .select('id')
    .single();
    
  if (error || !newCart) {
    throw new Error('Failed to create cart');
  }
  
  return newCart.id;
}

// Add the function that was causing an error in CheckoutSuccess.tsx
export const handleCheckoutSuccess = async (sessionId: string) => {
  try {
    // In a real app, you would verify the payment with Stripe here
    // For now, we'll just return success
    return { success: true };
  } catch (error) {
    console.error('Error processing checkout success:', error);
    return { success: false, error: 'Failed to process payment confirmation' };
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
