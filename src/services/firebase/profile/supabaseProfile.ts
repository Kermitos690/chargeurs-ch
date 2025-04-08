
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from './types';

/**
 * Updates a user profile in Supabase
 */
export const updateSupabaseProfile = async (userId: string, profileData: ProfileData): Promise<boolean> => {
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
      return false;
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
      return false;
    } else {
      console.log("Mise à jour des détails utilisateur Supabase réussie");
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour Supabase:', error);
    return false;
  }
};

/**
 * Gets a user profile from Supabase
 */
export const getSupabaseProfile = async (userId: string) => {
  try {
    // Récupérer les données de base du profil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Erreur Supabase lors de la récupération du profil:', profileError);
      return null;
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
      return combinedData;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération depuis Supabase:', error);
    return null;
  }
};
