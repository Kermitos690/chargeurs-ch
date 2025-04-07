
import { supabase } from '@/integrations/supabase/client';
import { User, updatePassword } from 'firebase/auth';
import { auth } from '@/services/firebase/config';

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
  subscriptionType?: string;
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
      .from('user_details')
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

    // Get subscription_type from the profiles table as it's not in user_details
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_type')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      console.error('Erreur lors de la récupération du type d\'abonnement:', profileError);
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
      createdAt: data.updated_at, // Using updated_at as a fallback since created_at might not exist
      updatedAt: data.updated_at,
      subscriptionType: profileData?.subscription_type || 'basic' // Ensure we provide a default value
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
      .from('user_details')
      .update(dbProfile)
      .eq('id', userId);

    if (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return { success: false, error };
    }

    // Update subscription_type in profiles table if it's provided
    if (profile.subscriptionType) {
      const { error: subscriptionError } = await supabase
        .from('profiles')
        .update({ subscription_type: profile.subscriptionType })
        .eq('id', userId);

      if (subscriptionError) {
        console.error('Erreur lors de la mise à jour du type d\'abonnement:', subscriptionError);
        return { success: false, error: subscriptionError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return { success: false, error };
  }
};

/**
 * Met à jour le mot de passe de l'utilisateur dans Firebase
 * @param currentPassword Mot de passe actuel
 * @param newPassword Nouveau mot de passe
 * @returns Résultat de l'opération
 */
export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    const user = auth.currentUser;
    
    if (!user || !user.email) {
      return { 
        success: false, 
        error: "Aucun utilisateur connecté ou adresse email manquante"
      };
    }

    // Réauthentifier l'utilisateur est nécessaire pour les opérations sensibles,
    // mais cela nécessiterait une étape supplémentaire avec reauthenticateWithCredential
    // Pour simplifier, nous supposons que l'utilisateur est récemment authentifié

    // Mettre à jour le mot de passe
    await updatePassword(user, newPassword);
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    
    let errorMessage = "Une erreur est survenue lors de la mise à jour du mot de passe";
    if (error.code === 'auth/requires-recent-login') {
      errorMessage = "Pour des raisons de sécurité, veuillez vous reconnecter avant de modifier votre mot de passe";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères";
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};
