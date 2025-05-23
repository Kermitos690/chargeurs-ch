
import { ProfileData, ProfileResponse } from './types';
import { updateFirestoreProfile, getFirestoreProfile } from './firestoreProfile';
import { updateSupabaseProfile, getSupabaseProfile } from './supabaseProfile';

/**
 * Updates a user profile in both Firestore and Supabase
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData): Promise<ProfileResponse> => {
  try {
    console.log("Mise à jour du profil utilisateur:", userId, profileData);
    
    // Vérification de la validité de l'ID utilisateur
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      console.error("ID utilisateur invalide:", userId);
      return {
        success: false,
        error: "ID utilisateur invalide ou manquant"
      };
    }
    
    // Vérification et nettoyage des données du profil
    if (!profileData) {
      console.error("Données de profil invalides ou manquantes");
      return {
        success: false,
        error: "Données de profil invalides ou manquantes"
      };
    }
    
    // Créer une copie propre des données
    const cleanedData: ProfileData = {};
    
    // Nettoyer et valider chaque champ
    if (profileData.name !== undefined) cleanedData.name = profileData.name.trim();
    if (profileData.email !== undefined) cleanedData.email = profileData.email.trim();
    if (profileData.phone !== undefined) cleanedData.phone = profileData.phone.trim();
    if (profileData.address !== undefined) cleanedData.address = profileData.address.trim();
    if (profileData.city !== undefined) cleanedData.city = profileData.city.trim();
    if (profileData.postalCode !== undefined) cleanedData.postalCode = profileData.postalCode.trim();
    if (profileData.firstName !== undefined) cleanedData.firstName = profileData.firstName.trim();
    if (profileData.lastName !== undefined) cleanedData.lastName = profileData.lastName.trim();
    
    console.log("Données nettoyées:", cleanedData);
    
    // Mise à jour dans Firestore
    const firestoreSuccess = await updateFirestoreProfile(userId, cleanedData);
    
    // Mise à jour dans Supabase
    const supabaseSuccess = await updateSupabaseProfile(userId, cleanedData);
    
    if (firestoreSuccess && supabaseSuccess) {
      console.log("Profil mis à jour avec succès dans Firestore et Supabase");
      return {
        success: true,
        data: cleanedData
      };
    } else if (firestoreSuccess) {
      console.log("Profil mis à jour uniquement dans Firestore");
      return {
        success: true,
        data: cleanedData,
        error: "Échec de la mise à jour dans Supabase"
      };
    } else if (supabaseSuccess) {
      console.log("Profil mis à jour uniquement dans Supabase");
      return {
        success: true,
        data: cleanedData,
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
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      console.error("ID utilisateur invalide:", userId);
      return {
        success: false,
        error: "ID utilisateur invalide ou manquant"
      };
    }
    
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
