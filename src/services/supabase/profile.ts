
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Récupère le profil utilisateur depuis Supabase
 * @param userId ID de l'utilisateur
 * @returns Profil utilisateur ou null
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Utiliser le client Supabase pour accéder à la table user_details
    const { data, error } = await supabase
      .from('user_details' as any)
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Convertir les noms de champs snake_case en camelCase pour l'interface TypeScript
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postal_code,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return null;
  }
};

/**
 * Met à jour le profil utilisateur dans Supabase
 * @param userId ID de l'utilisateur
 * @param profile Données du profil à mettre à jour
 * @returns Résultat de l'opération
 */
export const updateUserProfile = async (
  userId: string,
  profile: Partial<UserProfile>
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Convertir les noms de champs camelCase en snake_case pour la base de données
    const dbProfile = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      postal_code: profile.postalCode,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('user_details' as any)
      .update(dbProfile)
      .eq('id', userId);

    if (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return { success: false, error };
  }
};
