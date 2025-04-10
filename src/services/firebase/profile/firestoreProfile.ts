
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config';
import { ProfileData } from './types';

/**
 * Updates a user profile in Firestore
 */
export const updateFirestoreProfile = async (userId: string, profileData: ProfileData): Promise<boolean> => {
  try {
    if (!userId || !db) {
      console.error('ID utilisateur ou instance Firestore invalide');
      return false;
    }
    
    // S'assurer que profileData n'est pas null ou undefined
    if (!profileData) {
      console.error('Données de profil invalides');
      return false;
    }
    
    // Créer une copie des données pour éviter toute modification accidentelle
    const cleanedData = { ...profileData };
    
    // S'assurer que le nom n'est pas vide s'il est fourni
    if (cleanedData.name !== undefined && cleanedData.name.trim() === '') {
      console.warn('Nom vide détecté, sera enregistré comme null');
    }
    
    // Nettoyage des données de chaînes pour éviter les espaces en début/fin
    Object.keys(cleanedData).forEach(key => {
      if (typeof cleanedData[key] === 'string') {
        cleanedData[key] = cleanedData[key].trim();
      }
    });
    
    console.log("Données du profil à envoyer à Firestore:", cleanedData);
    
    const userRef = doc(db, 'users', userId);
    
    // Vérifier si le document existe
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Créer le document s'il n'existe pas
      console.log("Création d'un nouveau profil utilisateur dans Firestore");
      await setDoc(userRef, {
        ...cleanedData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      // Mettre à jour le document existant
      console.log("Mise à jour du profil utilisateur existant dans Firestore");
      await updateDoc(userRef, {
        ...cleanedData,
        updatedAt: new Date()
      });
    }
    console.log("Mise à jour Firestore réussie");
    return true;
  } catch (error) {
    console.error('Erreur Firestore lors de la mise à jour du profil:', error);
    return false;
  }
};

/**
 * Gets a user profile from Firestore
 */
export const getFirestoreProfile = async (userId: string) => {
  try {
    if (!userId || !db) {
      console.error('ID utilisateur ou instance Firestore invalide');
      return null;
    }
    
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const firestoreData = userDoc.data();
      console.log("Données récupérées depuis Firestore:", firestoreData);
      return firestoreData;
    }
    return null;
  } catch (error) {
    console.error('Erreur Firestore:', error);
    return null;
  }
};
