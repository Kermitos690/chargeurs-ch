
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from './types';

/**
 * Updates a user profile in Supabase
 */
export const updateSupabaseProfile = async (userId: string, profileData: ProfileData): Promise<boolean> => {
  try {
    if (!userId || !profileData) {
      return false;
    }
    
    // Mettre à jour le profil principal
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone
      })
      .eq('id', userId);
    
    if (profileError) {
      console.error('Erreur Supabase lors de la mise à jour du profil:', profileError);
      return false;
    }
    
    // Mettre à jour les détails utilisateur
    const { error: detailsError } = await supabase
      .from('user_details')
      .update({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        address: profileData.address,
        city: profileData.city,
        postal_code: profileData.postalCode
      })
      .eq('id', userId);
    
    if (detailsError) {
      console.error('Erreur Supabase lors de la mise à jour des détails:', detailsError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur Supabase:', error);
    return false;
  }
};

/**
 * Gets a user profile from Supabase
 */
export const getSupabaseProfile = async (userId: string) => {
  try {
    if (!userId) {
      return null;
    }
    
    // Récupérer les données de profil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Erreur Supabase lors de la récupération du profil:', profileError);
      return null;
    }
    
    // Récupérer les détails utilisateur
    const { data: userDetails, error: detailsError } = await supabase
      .from('user_details')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (detailsError && detailsError.code !== 'PGRST116') {
      console.error('Erreur Supabase lors de la récupération des détails:', detailsError);
      return null;
    }
    
    if (!profileData && !userDetails) {
      return null;
    }
    
    // Convertir en format ProfileData
    return {
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
  } catch (error) {
    console.error('Erreur Supabase:', error);
    return null;
  }
};
