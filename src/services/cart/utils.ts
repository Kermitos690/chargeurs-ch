
import { CartItem } from './types';

// Calculer le total du panier
export const calculateCartTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const price = item.variant?.price || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};
