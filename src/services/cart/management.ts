
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getOrCreateSessionId, initializeCart } from './session';

// Helper pour déclencher l'événement de mise à jour du panier
const triggerCartUpdate = () => {
  window.dispatchEvent(new Event('cart-updated'));
};

// Vider le panier
export const clearCart = async (userId?: string) => {
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
    const { data: cart, error: cartError } = await cartQuery.single();

    if (cartError) {
      if (cartError.code === 'PGRST116') {
        // Si aucun panier n'est trouvé, rien à vider
        return true;
      }
      throw cartError;
    }
    
    if (!cart) return true;

    // Supprimer tous les articles du panier
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (deleteError) throw deleteError;
    
    toast.success('Panier vidé');
    triggerCartUpdate();
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    toast.error('Impossible de vider le panier');
    return false;
  }
};

// Synchroniser le panier après connexion
export const syncCartAfterLogin = async (userId: string) => {
  try {
    await transferCartToUser(userId);
    triggerCartUpdate();
    return true;
  } catch (error) {
    console.error('Erreur lors de la synchronisation du panier:', error);
    return false;
  }
};

// Importer la fonction transferCartToUser
import { transferCartToUser } from './session';
