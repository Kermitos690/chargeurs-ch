
import { doc, updateDoc, getDoc } from 'firebase/firestore';
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
    // 1. Mettre à jour dans Firestore
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
    
    // 2. Mettre à jour dans Supabase si disponible
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      
      if (error) {
        console.error('Erreur Supabase lors de la mise à jour du profil:', error);
      }
      
      // Si des détails utilisateur spécifiques sont fournis, les mettre à jour aussi
      if (profileData.address || profileData.city || profileData.postalCode || 
          profileData.firstName || profileData.lastName) {
        const { error: detailsError } = await supabase
          .from('user_details')
          .upsert({
            id: userId,
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            address: profileData.address,
            city: profileData.city,
            postal_code: profileData.postalCode,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
          
        if (detailsError) {
          console.error('Erreur Supabase lors de la mise à jour des détails utilisateur:', detailsError);
        }
      }
    } catch (supabaseError) {
      console.error('Erreur lors de la mise à jour Supabase:', supabaseError);
      // Continue même si Supabase échoue
    }
    
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
      if (profileData) {
        const combinedData = {
          ...profileData,
          firstName: userDetails?.first_name,
          lastName: userDetails?.last_name,
          address: userDetails?.address,
          city: userDetails?.city,
          postalCode: userDetails?.postal_code
        };
        
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
