
import { supabase } from '@/integrations/supabase/client';

/**
 * Génère ou récupère un ID de session pour les utilisateurs non connectés
 */
export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

/**
 * Initialise un panier pour un utilisateur (connecté ou non)
 */
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
    
    const { data: existingCarts, error: fetchError } = await query;

    if (fetchError) throw fetchError;
    
    const existingCart = existingCarts && existingCarts.length > 0 ? existingCarts[0] : null;

    if (!existingCart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({
          user_id: userId || null,
          session_id: !userId ? sessionId : null,
        })
        .select('id');

      if (createError) throw createError;
      return newCart[0].id;
    }

    return existingCart.id;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du panier:', error);
    return null;
  }
};
