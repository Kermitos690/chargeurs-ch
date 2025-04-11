
// Ce fichier est maintenu pour la compatibilité avec le code existant
// mais il réexporte désormais des fonctions de Supabase

import { supabase } from '@/integrations/supabase/client';
import { loginAdmin, logoutAdmin } from '@/services/auth';

// Réexporter l'authentification et les fonctions d'administration
export { loginAdmin, logoutAdmin };

// Réexporter le client auth de Supabase comme remplacement de l'auth Firebase
export const auth = supabase.auth;

// Fonctions pour manipuler les collections (remplacer Firestore)
export const getCollection = async (collectionName: string) => {
  try {
    // Vérifiez si la collection est une table valide dans Supabase
    const tables = ['user', 'admin_roles', 'cart_items', 'carts', 'products', 
                  'product_variants', 'messages', 'order_items', 'orders', 
                  'powerbanks', 'product_categories', 'profiles', 'rentals', 
                  'stations', 'system_config', 'transactions', 'user_details', 'wallets'];
    
    if (!tables.includes(collectionName)) {
      console.warn(`Warning: Table '${collectionName}' not found in the database schema`);
    }
    
    const { data, error } = await supabase
      .from(collectionName as any)
      .select('*');
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la collection ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour récupérer un document
export const getDocument = async (collectionName: string, id: string) => {
  try {
    // Vérifiez si la collection est une table valide dans Supabase
    const tables = ['user', 'admin_roles', 'cart_items', 'carts', 'products', 
                  'product_variants', 'messages', 'order_items', 'orders', 
                  'powerbanks', 'product_categories', 'profiles', 'rentals', 
                  'stations', 'system_config', 'transactions', 'user_details', 'wallets'];
    
    if (!tables.includes(collectionName)) {
      console.warn(`Warning: Table '${collectionName}' not found in the database schema`);
    }
    
    const { data, error } = await supabase
      .from(collectionName as any)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du document ${id} dans ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour mettre à jour un document
export const updateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    // Vérifiez si la collection est une table valide dans Supabase
    const tables = ['user', 'admin_roles', 'cart_items', 'carts', 'products', 
                  'product_variants', 'messages', 'order_items', 'orders', 
                  'powerbanks', 'product_categories', 'profiles', 'rentals', 
                  'stations', 'system_config', 'transactions', 'user_details', 'wallets'];
    
    if (!tables.includes(collectionName)) {
      console.warn(`Warning: Table '${collectionName}' not found in the database schema`);
    }
    
    const { error } = await supabase
      .from(collectionName as any)
      .update(data)
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour du document ${id} dans ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Fonction pour supprimer un document
export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    // Vérifiez si la collection est une table valide dans Supabase
    const tables = ['user', 'admin_roles', 'cart_items', 'carts', 'products', 
                  'product_variants', 'messages', 'order_items', 'orders', 
                  'powerbanks', 'product_categories', 'profiles', 'rentals', 
                  'stations', 'system_config', 'transactions', 'user_details', 'wallets'];
    
    if (!tables.includes(collectionName)) {
      console.warn(`Warning: Table '${collectionName}' not found in the database schema`);
    }
    
    const { error } = await supabase
      .from(collectionName as any)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du document ${id} dans ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Réexporter des utilitaires de formatage
export * from './utils';

// Réexporter les fonctions liées au profil
export * from './profile';
