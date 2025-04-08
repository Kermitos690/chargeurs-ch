
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateSessionId } from './session';
import { CartItem } from './types';

/**
 * Récupère les articles du panier
 */
export const getCartItems = async (userId?: string): Promise<CartItem[]> => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la requête de panier
    let cartQuery = supabase.from('carts').select('id');
    
    if (userId) {
      cartQuery = cartQuery.eq('user_id', userId);
    } else {
      cartQuery = cartQuery.eq('session_id', sessionId);
    }
    
    // Trouver l'ID du panier
    const { data: carts, error: cartError } = await cartQuery;

    if (cartError) {
      console.error('Erreur lors de la récupération du panier:', cartError);
      return [];
    }
    
    const cart = carts && carts.length > 0 ? carts[0] : null;
    if (!cart) return [];

    // Récupérer les articles du panier avec détails
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        price_at_add,
        products (
          id,
          name,
          slug,
          image_url,
          price,
          sale_price
        ),
        product_variants (
          id,
          name,
          image_url,
          price,
          attributes
        )
      `)
      .eq('cart_id', cart.id);

    if (itemsError) {
      console.error('Erreur lors de la récupération des articles:', itemsError);
      return [];
    }

    // Formater les données pour correspondre à notre type CartItem
    return cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      priceAtAdd: item.price_at_add,
      product: {
        id: item.products.id,
        name: item.products.name,
        slug: item.products.slug,
        imageUrl: item.products.image_url,
        price: item.products.sale_price || item.products.price,
        regularPrice: item.products.price,
      },
      variant: item.product_variants ? {
        id: item.product_variants.id,
        name: item.product_variants.name,
        imageUrl: item.product_variants.image_url,
        price: item.product_variants.price,
        attributes: typeof item.product_variants.attributes === 'string' 
          ? JSON.parse(item.product_variants.attributes) 
          : item.product_variants.attributes,
      } : null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return [];
  }
};
