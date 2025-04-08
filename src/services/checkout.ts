
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCartItems, calculateCartTotal, clearCart } from '@/services/cart';

export const createCheckoutSession = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour finaliser votre achat');
      return { success: false };
    }
    
    // Get cart items
    const cartItems = await getCartItems(user.id);
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return { success: false };
    }
    
    // Format items for Stripe
    const items = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name + (item.variant ? ` - ${item.variant.name}` : ''),
      price: item.variant ? item.variant.price : item.product.price,
      quantity: item.quantity
    }));
    
    // Call Stripe checkout edge function
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { items }
    });
    
    if (error) {
      throw error;
    }
    
    if (data?.url) {
      // Redirect to Stripe checkout
      window.location.href = data.url;
      return { success: true };
    } else {
      throw new Error('No checkout URL returned');
    }
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast.error('Échec du traitement de la commande');
    return { success: false };
  }
};

// Add the function that was causing an error in CheckoutSuccess.tsx
export const handleCheckoutSuccess = async (sessionId: string) => {
  try {
    // In a real app, you would verify the payment with Stripe here
    // For now, we'll just return success
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Clear the cart after successful payment
      await clearCart(user.id);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing checkout success:', error);
    return { success: false, error: 'Failed to process payment confirmation' };
  }
};
