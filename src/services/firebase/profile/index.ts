
import { auth } from '../config';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { ProfileData, ProfileResponse } from './types';
import { updateFirestoreProfile, getFirestoreProfile } from './firestoreProfile';
import { updateSupabaseProfile, getSupabaseProfile } from './supabaseProfile';

/**
 * Met à jour le profil d'un utilisateur dans Firestore et Supabase (si disponible)
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData): Promise<ProfileResponse> => {
  try {
    console.log("Début de la mise à jour du profil pour", userId, "avec données:", profileData);
    
    // 1. Mettre à jour dans Firestore
    const firestoreSuccess = await updateFirestoreProfile(userId, profileData);
    
    // 2. Mettre à jour dans Supabase si disponible
    const supabaseSuccess = await updateSupabaseProfile(userId, profileData);
    
    // Si le nom a été mis à jour et que l'utilisateur est connecté,
    // mettre également à jour le profil Firebase Auth
    if (profileData.name && auth.currentUser) {
      try {
        console.log("Mise à jour du displayName dans Firebase Auth");
        await updateFirebaseProfile(auth.currentUser, {
          displayName: profileData.name
        });
        console.log("Mise à jour Firebase Auth réussie");
      } catch (authError) {
        console.error('Erreur lors de la mise à jour du profil Firebase Auth:', authError);
      }
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur globale lors de la mise à jour du profil:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la mise à jour du profil' 
    };
  }
};

/**
 * Récupère le profil d'un utilisateur depuis Firestore et Supabase (si disponible)
 */
export const getUserProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    // 1. Essayer d'abord de récupérer depuis Supabase
    const supabaseData = await getSupabaseProfile(userId);
    
    // Si des données ont été trouvées dans Supabase, les retourner
    if (supabaseData) {
      return { 
        success: true, 
        data: supabaseData
      };
    }
    
    // 2. Si Supabase n'a pas de données, essayer Firestore
    const firestoreData = await getFirestoreProfile(userId);
    
    if (firestoreData) {
      return { 
        success: true, 
        data: firestoreData 
      };
    }
    
    // 3. Si aucune donnée n'est trouvée ou en cas d'erreur, créer un profil de base
    if (auth.currentUser) {
      const basicUserData = {
        id: userId,
        name: auth.currentUser.displayName || '',
        email: auth.currentUser.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        firstName: '',
        lastName: '',
        subscription_type: 'basic',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return {
        success: true,
        data: basicUserData
      };
    }
    
    // En dernier recours, si aucune donnée n'est disponible et l'utilisateur n'est pas connecté
    return { 
      success: false, 
      error: 'Profil utilisateur non trouvé' 
    };
  } catch (error: any) {
    console.error('Erreur lors de la récupération du profil:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la récupération du profil' 
    };
  }
};

// Re-export the ProfileData type
export type { ProfileData } from './types';
