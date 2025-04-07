
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

// Ajouter d'autres fonctions utilitaires
export const formatPrice = (price: number): string => {
  return price.toFixed(2) + ' CHF';
};

// Vérifier si un article est déjà dans le panier
export const isItemInCart = (cartItems: CartItem[], productId: string, variantId?: string): boolean => {
  return cartItems.some(item => 
    item.product.id === productId && 
    ((!variantId && !item.variant) || (item.variant?.id === variantId))
  );
};
