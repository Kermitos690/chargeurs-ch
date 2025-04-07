
import { CartItem } from './types';
import { toast } from 'sonner';

// Calculer le total du panier
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  if (!cartItems || cartItems.length === 0) return 0;
  
  return cartItems.reduce((total, item) => {
    const itemPrice = item.variant?.price || item.product.price;
    return total + (itemPrice * item.quantity);
  }, 0);
};
