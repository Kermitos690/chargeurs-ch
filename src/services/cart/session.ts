
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Récupère ou crée un ID de session pour les utilisateurs non connectés
 */
export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('cart_session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('cart_session_id', sessionId);
  }
  
  return sessionId;
};

/**
 * Récupère ou crée un panier pour l'utilisateur ou la session
 */
export const getOrCreateCart = async (userId?: string) => {
  try {
    // Construire la requête appropriée selon que l'utilisateur est connecté ou non
    let query = supabase.from('carts');
    const sessionId = getOrCreateSessionId();
    
    if (userId) {
      // Pour les utilisateurs connectés
      const { data: existingCarts, error: fetchError } = await query
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (fetchError) {
        console.error('Erreur lors de la recherche du panier:', fetchError);
        return null;
      }
      
      // Retourner le panier existant s'il existe
      if (existingCarts) {
        return existingCarts;
      }
      
      // Créer un nouveau panier pour l'utilisateur
      const { data: newCart, error: createError } = await query
        .insert({ user_id: userId })
        .select()
        .single();
        
      if (createError) {
        console.error('Erreur lors de la création du panier:', createError);
        return null;
      }
      
      return newCart;
    } else {
      // Pour les utilisateurs non connectés (panier basé sur la session)
      const { data: existingCarts, error: fetchError } = await query
        .select('*')
        .eq('session_id', sessionId)
        .maybeSingle();
        
      if (fetchError) {
        console.error('Erreur lors de la recherche du panier:', fetchError);
        return null;
      }
      
      // Retourner le panier existant s'il existe
      if (existingCarts) {
        return existingCarts;
      }
      
      // Créer un nouveau panier pour la session
      const { data: newCart, error: createError } = await query
        .insert({ session_id: sessionId })
        .select()
        .single();
        
      if (createError) {
        console.error('Erreur lors de la création du panier:', createError);
        return null;
      }
      
      return newCart;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération ou création du panier:', error);
    return null;
  }
};
