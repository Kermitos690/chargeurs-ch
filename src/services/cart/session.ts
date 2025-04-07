
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper pour générer un ID de session pour les utilisateurs non connectés
export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

// Initialiser un panier
export const initializeCart = async (userId?: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    
    // Construire la requête de manière sécurisée
    let query = supabase.from('carts').select('id');
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_id', sessionId);
    }
    
    const { data: existingCart, error: fetchError } = await query.single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 est le code d'erreur pour "No rows returned" - ce n'est pas vraiment une erreur dans notre cas
      console.error('Erreur lors de la récupération du panier:', fetchError);
      throw fetchError;
    }

    if (!existingCart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({
          user_id: userId || null,
          session_id: !userId ? sessionId : null,
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Erreur lors de la création du panier:', createError);
        throw createError;
      }
      return newCart.id;
    }

    return existingCart.id;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du panier:', error);
    toast.error('Impossible d\'initialiser le panier');
    return null;
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
      .single();

    if (sessionCartError && sessionCartError.code !== 'PGRST116') throw sessionCartError;
    if (!sessionCart) return true; // Pas de panier de session, rien à transférer

    // Trouver un panier existant pour l'utilisateur
    const { data: userCart, error: userCartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (userCartError && userCartError.code !== 'PGRST116') throw userCartError;

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
          .single();

        if (existingItemError && existingItemError.code !== 'PGRST116') throw existingItemError;

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
