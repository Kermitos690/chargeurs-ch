
import { supabase } from '@/integrations/supabase/client';

export interface ProfileData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  firstName?: string;
  lastName?: string;
}

export interface ProfileResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

/**
 * Met à jour un profil utilisateur dans Supabase
 */
export const updateUserProfile = async (userId: string, profileData: ProfileData): Promise<ProfileResponse> => {
  try {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return {
        success: false,
        error: "ID utilisateur invalide ou manquant"
      };
    }
    
    if (!profileData) {
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
    
    // Mise à jour dans Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        name: cleanedData.name,
        email: cleanedData.email,
        phone: cleanedData.phone
      })
      .eq('id', userId);
    
    if (error) throw error;
    
    // Mise à jour des détails utilisateur
    const { error: detailsError } = await supabase
      .from('user_details')
      .update({
        first_name: cleanedData.firstName,
        last_name: cleanedData.lastName,
        address: cleanedData.address,
        city: cleanedData.city,
        postal_code: cleanedData.postalCode
      })
      .eq('id', userId);
    
    if (detailsError) {
      return {
        success: true,
        data: cleanedData,
        error: "Profil mis à jour, mais erreur lors de la mise à jour des détails"
      };
    }
    
    return {
      success: true,
      data: cleanedData
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
};

/**
 * Récupère un profil utilisateur depuis Supabase
 */
export const getUserProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return {
        success: false,
        error: "ID utilisateur invalide ou manquant"
      };
    }
    
    // Récupérer depuis Supabase profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error("Erreur lors de la récupération du profil:", profileError);
      return {
        success: false,
        error: profileError.message
      };
    }
    
    // Récupérer depuis Supabase user_details
    const { data: userDetails, error: detailsError } = await supabase
      .from('user_details')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (detailsError && detailsError.code !== 'PGRST116') {
      console.error("Erreur lors de la récupération des détails:", detailsError);
      return {
        success: false,
        error: detailsError.message
      };
    }
    
    if (!profileData && !userDetails) {
      return {
        success: false,
        error: "Aucun profil trouvé"
      };
    }
    
    // Fusionner les données
    const mergedData: ProfileData = {
      id: userId,
      name: profileData?.name,
      email: profileData?.email,
      phone: profileData?.phone,
      subscriptionType: profileData?.subscription_type,
      firstName: userDetails?.first_name,
      lastName: userDetails?.last_name,
      address: userDetails?.address,
      city: userDetails?.city,
      postalCode: userDetails?.postal_code
    };
    
    return {
      success: true,
      data: mergedData
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
};
