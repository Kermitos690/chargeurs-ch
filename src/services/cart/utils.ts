
import { CartItem } from './types';

/**
 * Calcule le total du panier
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.variant?.price || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Calcule le nombre total d'articles dans le panier
 */
export const calculateCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};
