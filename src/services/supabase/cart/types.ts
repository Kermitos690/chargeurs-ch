
import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
  variant?: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  } | null;
}

// Helper function to get or create a cart
export async function getOrCreateCart(userId: string) {
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
