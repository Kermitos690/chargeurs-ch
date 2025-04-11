
// Ce fichier est maintenu pour la compatibilité avec le code existant
// mais il réexporte désormais des fonctions de Supabase

import { supabase } from '@/integrations/supabase/client';
import { loginAdmin, logoutAdmin } from '@/services/auth';

// Réexporter l'authentification et les fonctions d'administration
export { loginAdmin, logoutAdmin };

// Réexporter le client auth de Supabase comme remplacement de l'auth Firebase
export const auth = supabase.auth;

// Fonctions pour manipuler les collections (remplacer Firestore)
export const getCollection = async (collection: string) => {
  try {
    const { data, error } = await supabase
      .from(collection)
      .select('*');
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la collection ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour récupérer un document
export const getDocument = async (collection: string, id: string) => {
  try {
    const { data, error } = await supabase
      .from(collection)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du document ${id} dans ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour mettre à jour un document
export const updateDocument = async (collection: string, id: string, data: any) => {
  try {
    const { error } = await supabase
      .from(collection)
      .update(data)
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour du document ${id} dans ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour supprimer un document
export const deleteDocument = async (collection: string, id: string) => {
  try {
    const { error } = await supabase
      .from(collection)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du document ${id} dans ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

// Réexporter des utilitaires de formatage
export * from './utils';

// Réexporter les fonctions liées au profil
export * from './profile';

// Cette structure sera progressivement migrée vers une structure Supabase pure
