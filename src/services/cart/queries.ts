
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CartItem } from './types';
import { getOrCreateSessionId } from './session';

// Récupérer le contenu du panier
export const getCartItems = async (userId?: string): Promise<CartItem[]> => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la requête de manière sécurisée
    let cartQuery = supabase.from('carts').select('id');
    
    if (userId) {
      cartQuery = cartQuery.eq('user_id', userId);
    } else {
      cartQuery = cartQuery.eq('session_id', sessionId);
    }
    
    // D'abord, trouver l'ID du panier
    const { data: cart, error: cartError } = await cartQuery.single();

    if (cartError) {
      if (cartError.code === 'PGRST116') {
        // Si aucun panier n'est trouvé, retourner un tableau vide
        return [];
      }
      throw cartError;
    }
    
    if (!cart) return [];

    // Ensuite, récupérer les articles du panier avec les détails des produits
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

    if (itemsError) throw itemsError;

    // Convertir les données de la base en format CartItem
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
        attributes: item.product_variants.attributes,
      } : null,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    toast.error('Impossible de récupérer le contenu du panier');
    return [];
  }
};
