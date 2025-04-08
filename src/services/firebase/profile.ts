
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { supabase } from '@/integrations/supabase/client';

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
 * Met à jour le profil d'un utilisateur dans Firestore et Supabase (si disponible)
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData) => {
  try {
    console.log("Début de la mise à jour du profil pour", userId, "avec données:", profileData);
    
    // 1. Mettre à jour dans Firestore
    try {
      const userRef = doc(db, 'users', userId);
      
      // Vérifier si le document existe
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Créer le document s'il n'existe pas
        console.log("Création d'un nouveau profil utilisateur dans Firestore");
        await setDoc(userRef, {
          ...profileData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } else {
        // Mettre à jour le document existant
        console.log("Mise à jour du profil utilisateur existant dans Firestore");
        await updateDoc(userRef, {
          ...profileData,
          updatedAt: new Date()
        });
      }
      console.log("Mise à jour Firestore réussie");
    } catch (firestoreError) {
      console.error('Erreur Firestore lors de la mise à jour du profil:', firestoreError);
      // Continuer même si Firestore échoue, on va essayer Supabase
    }
    
    // 2. Mettre à jour dans Supabase si disponible
    try {
      console.log("Tentative de mise à jour du profil dans Supabase");
      
      // Mise à jour de la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      
      if (profileError) {
        console.error('Erreur Supabase lors de la mise à jour du profil:', profileError);
      } else {
        console.log("Mise à jour du profil Supabase réussie");
      }
      
      // Mise à jour de la table user_details pour stocker les adresses et noms
      console.log("Mise à jour des détails utilisateur dans Supabase");
      const { error: detailsError } = await supabase
        .from('user_details')
        .upsert({
          id: userId,
          first_name: profileData.firstName || profileData.name?.split(' ')[0] || '',
          last_name: profileData.lastName || 
            (profileData.name?.split(' ').length > 1 ? 
              profileData.name?.split(' ').slice(1).join(' ') : ''),
          address: profileData.address,
          city: profileData.city,
          postal_code: profileData.postalCode,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      
      if (detailsError) {
        console.error('Erreur Supabase lors de la mise à jour des détails utilisateur:', detailsError);
      } else {
        console.log("Mise à jour des détails utilisateur Supabase réussie");
      }
    } catch (supabaseError) {
      console.error('Erreur lors de la mise à jour Supabase:', supabaseError);
      // Continue même si Supabase échoue
    }
    
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
export const getUserProfile = async (userId: string) => {
  try {
    // 1. Essayer d'abord de récupérer depuis Supabase
    try {
      // Récupérer les données de base du profil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Erreur Supabase lors de la récupération du profil:', profileError);
      }
      
      // Récupérer les détails utilisateur supplémentaires
      const { data: userDetails, error: detailsError } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (detailsError && detailsError.code !== 'PGRST116') {
        console.error('Erreur Supabase lors de la récupération des détails utilisateur:', detailsError);
      }
      
      // Si des données ont été trouvées dans Supabase, les retourner
      if (profileData || userDetails) {
        const combinedData = {
          ...(profileData || {}),
          name: profileData?.name || '',
          email: profileData?.email || '',
          phone: profileData?.phone || '',
          firstName: userDetails?.first_name || '',
          lastName: userDetails?.last_name || '',
          address: userDetails?.address || '',
          city: userDetails?.city || '',
          postalCode: userDetails?.postal_code || ''
        };
        
        console.log("Données récupérées depuis Supabase:", combinedData);
        return { 
          success: true, 
          data: combinedData
        };
      }
    } catch (supabaseError) {
      console.error('Erreur lors de la récupération depuis Supabase:', supabaseError);
      // Continue vers Firestore si Supabase échoue
    }
    
    // 2. Si Supabase n'a pas de données, essayer Firestore
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const firestoreData = userDoc.data();
        console.log("Données récupérées depuis Firestore:", firestoreData);
        return { 
          success: true, 
          data: firestoreData 
        };
      }
    } catch (firestoreError: any) {
      console.error('Erreur Firestore:', firestoreError);
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
