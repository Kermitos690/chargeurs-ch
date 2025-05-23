
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { accessories } from '@/data/accessories';

// Helper pour générer un ID de session pour les utilisateurs non connectés
const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

// Structure pour stocker le panier localement
interface LocalCartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl?: string;
  type: 'accessory'; // Pour permettre d'autres types plus tard comme 'product'
}

// Récupérer le panier local
const getLocalCart = (): LocalCartItem[] => {
  const cart = localStorage.getItem('local_cart');
  return cart ? JSON.parse(cart) : [];
};

// Sauvegarder le panier local
const saveLocalCart = (cart: LocalCartItem[]) => {
  localStorage.setItem('local_cart', JSON.stringify(cart));
};

// Initialiser un panier
export const initializeCart = async (userId?: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la condition de requête de manière sécurisée
    let query = supabase.from('carts').select('id');
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_id', sessionId);
    }
    
    const { data: existingCart, error: fetchError } = await query.maybeSingle();

    if (fetchError) throw fetchError;

    if (!existingCart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({
          user_id: userId || null,
          session_id: !userId ? sessionId : null,
        })
        .select('id')
        .single();

      if (createError) throw createError;
      return newCart.id;
    }

    return existingCart.id;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du panier:', error);
    toast.error('Impossible d\'initialiser le panier');
    return null;
  }
};

// Ajouter un article au panier
export const addToCart = async (
  productId: string, 
  quantity: number = 1, 
  price: number, 
  variantId?: string, 
  userId?: string
) => {
  try {
    // Vérifier si c'est un accessoire (données locales)
    const accessory = accessories.find(acc => acc.id.toString() === productId);
    
    if (accessory) {
      // Si c'est un accessoire, on l'ajoute au panier local
      const localCart = getLocalCart();
      const existingItemIndex = localCart.findIndex(item => 
        item.productId === productId && item.type === 'accessory'
      );
      
      if (existingItemIndex >= 0) {
        // Mettre à jour la quantité si l'article existe déjà
        localCart[existingItemIndex].quantity += quantity;
      } else {
        // Ajouter un nouvel article
        const priceValue = parseFloat(accessory.price.replace(' CHF', '').trim());
        localCart.push({
          id: crypto.randomUUID(),
          productId: productId,
          quantity,
          price: priceValue,
          name: accessory.name,
          imageUrl: accessory.image,
          type: 'accessory'
        });
      }
      
      saveLocalCart(localCart);
      toast.success(`${accessory.name} ajouté au panier`);
      return true;
    }
    
    // Sinon, c'est un produit de Supabase
    const cartId = await initializeCart(userId);
    if (!cartId) throw new Error('Erreur lors de l\'initialisation du panier');

    // Vérifier si l'article existe déjà dans le panier
    const { data: existingItem, error: fetchError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingItem) {
      // Mettre à jour la quantité si l'article existe déjà
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);

      if (updateError) throw updateError;
      
      toast.success('Article ajouté au panier');
      return true;
    } else {
      // Ajouter un nouvel article sinon
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: productId,
          variant_id: variantId || null,
          quantity,
          price_at_add: price,
        });

      if (insertError) throw insertError;
      
      toast.success('Article ajouté au panier');
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    toast.error('Impossible d\'ajouter l\'article au panier');
    return false;
  }
};

// Récupérer le contenu du panier - version améliorée avec support local
export const getCartItems = async (userId?: string) => {
  try {
    // Récupérer d'abord les éléments locaux
    const localCart = getLocalCart();
    const localCartItems = localCart.map(item => {
      if (item.type === 'accessory') {
        const accessory = accessories.find(acc => acc.id.toString() === item.productId);
        return {
          id: item.id,
          quantity: item.quantity,
          product: {
            id: item.productId,
            name: accessory?.name || item.name,
            slug: `accessory-${item.productId}`,
            imageUrl: accessory?.image || item.imageUrl,
            price: item.price,
          },
          variant: null,
        };
      }
      return null;
    }).filter(Boolean);
    
    // Essayer de récupérer les éléments de la base de données
    try {
      const sessionId = getOrCreateSessionId();
      console.log('Session ID:', sessionId);
      
      // Construire la requête de manière sécurisée
      let cartQuery = supabase.from('carts').select('id');
      
      if (userId) {
        cartQuery = cartQuery.eq('user_id', userId);
        console.log('Recherche du panier pour l\'utilisateur:', userId);
      } else {
        cartQuery = cartQuery.eq('session_id', sessionId);
        console.log('Recherche du panier pour la session:', sessionId);
      }
      
      // D'abord, trouver l'ID du panier
      const { data: cart, error: cartError } = await cartQuery.maybeSingle();

      if (cartError) {
        console.error('Erreur lors de la récupération du panier:', cartError);
        // Si erreur avec Supabase, retourner au moins les éléments locaux
        return localCartItems;
      }
      
      if (!cart) {
        console.log('Aucun panier trouvé, uniquement les éléments locaux sont disponibles');
        return localCartItems;
      }

      console.log('Panier trouvé avec ID:', cart.id);

      // Ensuite, récupérer les articles du panier
      const { data: dbItems, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          price_at_add,
          product_id,
          variant_id
        `)
        .eq('cart_id', cart.id);

      if (itemsError) {
        console.error('Erreur lors de la récupération des articles:', itemsError);
        return localCartItems; // Retourner seulement les éléments locaux en cas d'erreur
      }

      // Pour chaque élément, récupérer les détails du produit séparément
      const dbCartItems = await Promise.all(dbItems.map(async (item) => {
        try {
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('id, name, slug, image_url, price, sale_price')
            .eq('id', item.product_id)
            .maybeSingle();
          
          if (productError || !product) {
            console.error(`Erreur ou produit ${item.product_id} non trouvé:`, productError);
            return null;
          }

          // Optionnel: récupérer les détails de la variante si nécessaire
          let variant = null;
          if (item.variant_id) {
            const { data: variantData, error: variantError } = await supabase
              .from('product_variants')
              .select('id, name, image_url, price, attributes')
              .eq('id', item.variant_id)
              .maybeSingle();
            
            if (!variantError && variantData) {
              variant = {
                id: variantData.id,
                name: variantData.name,
                imageUrl: variantData.image_url,
                price: variantData.price,
                attributes: variantData.attributes,
              };
            }
          }

          return {
            id: item.id,
            quantity: item.quantity,
            product: {
              id: product.id,
              name: product.name,
              slug: product.slug,
              imageUrl: product.image_url,
              price: product.sale_price || product.price,
              regularPrice: product.price,
            },
            variant: variant,
          };
        } catch (error) {
          console.error(`Erreur lors de la récupération des détails pour l'article ${item.id}:`, error);
          return null;
        }
      }));

      // Combiner les éléments locaux et de la base de données
      return [...localCartItems, ...dbCartItems.filter(Boolean)];
    } catch (error) {
      console.error('Erreur avec Supabase, utilisation des données locales uniquement:', error);
      return localCartItems;
    }
  } catch (error) {
    console.error('Erreur critique lors de la récupération du panier:', error);
    toast.error('Impossible de récupérer le contenu du panier');
    return [];
  }
};

// Mettre à jour la quantité d'un article
export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  try {
    // Vérifier d'abord si c'est un élément du panier local
    const localCart = getLocalCart();
    const localItemIndex = localCart.findIndex(item => item.id === itemId);
    
    if (localItemIndex >= 0) {
      if (quantity <= 0) {
        // Supprimer l'article si la quantité est 0 ou moins
        localCart.splice(localItemIndex, 1);
      } else {
        // Mettre à jour la quantité
        localCart[localItemIndex].quantity = quantity;
      }
      saveLocalCart(localCart);
      toast.success('Panier mis à jour');
      return true;
    }
    
    // Sinon, c'est un élément de Supabase
    if (quantity <= 0) {
      // Si la quantité est 0 ou moins, supprimer l'article
      return removeCartItem(itemId);
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) throw error;
    
    toast.success('Panier mis à jour');
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    toast.error('Impossible de mettre à jour le panier');
    return false;
  }
};

// Supprimer un article du panier
export const removeCartItem = async (itemId: string) => {
  try {
    // Vérifier d'abord si c'est un élément du panier local
    const localCart = getLocalCart();
    const localItemIndex = localCart.findIndex(item => item.id === itemId);
    
    if (localItemIndex >= 0) {
      localCart.splice(localItemIndex, 1);
      saveLocalCart(localCart);
      toast.success('Article supprimé du panier');
      return true;
    }
    
    // Sinon, c'est un élément de Supabase
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    
    toast.success('Article supprimé du panier');
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    toast.error('Impossible de supprimer l\'article');
    return false;
  }
};

// Vider le panier
export const clearCart = async (userId?: string) => {
  try {
    // Vider le panier local
    saveLocalCart([]);
    
    // Essayer de vider aussi le panier Supabase si possible
    try {
      const sessionId = getOrCreateSessionId();
      
      // Construire la requête de manière sécurisée
      let cartQuery = supabase.from('carts').select('id');
      
      if (userId) {
        cartQuery = cartQuery.eq('user_id', userId);
      } else {
        cartQuery = cartQuery.eq('session_id', sessionId);
      }
      
      // Trouver l'ID du panier
      const { data: cart, error: cartError } = await cartQuery.maybeSingle();

      if (cartError) throw cartError;
      if (!cart) return true;

      // Supprimer tous les articles du panier
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);

      if (deleteError) throw deleteError;
    } catch (error) {
      console.error('Erreur lors du vidage du panier Supabase:', error);
      // Continuer même si le panier Supabase n'a pas pu être vidé
    }
    
    toast.success('Panier vidé');
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    toast.error('Impossible de vider le panier');
    return false;
  }
};

// Transférer le panier d'une session à un utilisateur (lors de la connexion)
export const transferCartToUser = async (userId: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Trouver le panier de session
    const { data: sessionCart, error: sessionCartError } = await supabase
      .from('carts')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (sessionCartError) throw sessionCartError;
    if (!sessionCart) return true; // Pas de panier de session, rien à transférer

    // Trouver un panier existant pour l'utilisateur
    const { data: userCart, error: userCartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (userCartError) throw userCartError;

    if (userCart) {
      // Si l'utilisateur a déjà un panier, fusionner les articles
      // D'abord, récupérer les articles du panier de session
      const { data: sessionItems, error: itemsError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', sessionCart.id);

      if (itemsError) throw itemsError;

      // Pour chaque article du panier de session
      for (const item of sessionItems) {
        // Vérifier si cet article existe déjà dans le panier de l'utilisateur
        const { data: existingItem, error: existingItemError } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('cart_id', userCart.id)
          .eq('product_id', item.product_id)
          .eq('variant_id', item.variant_id)
          .maybeSingle();

        if (existingItemError) throw existingItemError;

        if (existingItem) {
          // Mettre à jour la quantité de l'article existant
          await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + item.quantity })
            .eq('id', existingItem.id);
        } else {
          // Ajouter l'article au panier de l'utilisateur
          await supabase
            .from('cart_items')
            .insert({
              ...item,
              id: undefined, // Pour générer un nouvel ID
              cart_id: userCart.id,
            });
        }
      }

      // Supprimer le panier de session
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', sessionCart.id);

      await supabase
        .from('carts')
        .delete()
        .eq('id', sessionCart.id);

    } else {
      // Si l'utilisateur n'a pas de panier, convertir le panier de session
      await supabase
        .from('carts')
        .update({ user_id: userId, session_id: null })
        .eq('id', sessionCart.id);
    }

    // Supprimer l'ID de session du localStorage
    localStorage.removeItem('cart_session_id');
    
    return true;
  } catch (error) {
    console.error('Erreur lors du transfert du panier:', error);
    return false;
  }
};

// Calculer le total du panier
export const calculateCartTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    const price = item.variant?.price || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};
