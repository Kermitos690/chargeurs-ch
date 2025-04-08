
import { ProfileData, ProfileResponse } from './types';
import { updateFirestoreProfile, getFirestoreProfile } from './firestoreProfile';
import { updateSupabaseProfile, getSupabaseProfile } from './supabaseProfile';

/**
 * Updates a user profile in both Firestore and Supabase
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData): Promise<ProfileResponse> => {
  try {
    console.log("Mise à jour du profil utilisateur:", userId, profileData);
    
    // Mise à jour dans Firestore
    const firestoreSuccess = await updateFirestoreProfile(userId, profileData);
    
    // Mise à jour dans Supabase
    const supabaseSuccess = await updateSupabaseProfile(userId, profileData);
    
    if (firestoreSuccess && supabaseSuccess) {
      console.log("Profil mis à jour avec succès dans Firestore et Supabase");
      return {
        success: true,
        data: profileData
      };
    } else if (firestoreSuccess) {
      console.log("Profil mis à jour uniquement dans Firestore");
      return {
        success: true,
        data: profileData,
        error: "Échec de la mise à jour dans Supabase"
      };
    } else if (supabaseSuccess) {
      console.log("Profil mis à jour uniquement dans Supabase");
      return {
        success: true,
        data: profileData,
        error: "Échec de la mise à jour dans Firestore"
      };
    } else {
      console.error("Échec de la mise à jour du profil");
      return {
        success: false,
        error: "Échec de la mise à jour du profil dans Firestore et Supabase"
      };
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
};

/**
 * Gets a user profile from Firestore and Supabase
 */
export const getUserProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    console.log("Récupération du profil utilisateur:", userId);
    
    // Récupérer depuis Firestore
    const firestoreData = await getFirestoreProfile(userId);
    
    // Récupérer depuis Supabase
    const supabaseData = await getSupabaseProfile(userId);
    
    if (firestoreData || supabaseData) {
      // Fusionner les données, en privilégiant Firestore
      const mergedData = {
        ...(supabaseData || {}),
        ...(firestoreData || {})
      };
      
      console.log("Profil récupéré avec succès:", mergedData);
      return {
        success: true,
        data: mergedData
      };
    } else {
      console.log("Aucun profil trouvé");
      return {
        success: false,
        error: "Aucun profil trouvé"
      };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
};
