
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';

// Type pour les données du profil utilisateur
export interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Met à jour le profil d'un utilisateur dans Firestore
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Vérifier si le document existe
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('Profil utilisateur non trouvé');
    }
    
    // Mettre à jour le document Firestore
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: new Date()
    });
    
    // Si le nom a été mis à jour et que l'utilisateur est connecté,
    // mettre également à jour le profil Firebase Auth
    if (profileData.name && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName: profileData.name
      });
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la mise à jour du profil' 
    };
  }
};

/**
 * Récupère le profil d'un utilisateur depuis Firestore
 */
export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('Profil utilisateur non trouvé');
    }
    
    return { 
      success: true, 
      data: userDoc.data() 
    };
  } catch (error: any) {
    console.error('Erreur lors de la récupération du profil:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la récupération du profil' 
    };
  }
};
