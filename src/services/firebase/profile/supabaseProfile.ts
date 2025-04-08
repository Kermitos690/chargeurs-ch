
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from './types';

/**
 * Updates a user profile in Supabase
 */
export const updateSupabaseProfile = async (userId: string, profileData: ProfileData): Promise<boolean> => {
  try {
    if (!userId || !supabase) {
      console.error('ID utilisateur ou instance Supabase invalide');
      return false;
    }
    
    // S'assurer que profileData n'est pas null ou undefined
    if (!profileData) {
      console.error('Données de profil invalides pour Supabase');
      return false;
    }
    
    console.log("Tentative de mise à jour du profil dans Supabase");
    
    // Vérifier et nettoyer les valeurs du profil
    const name = profileData.name !== undefined ? profileData.name : null;
    const email = profileData.email !== undefined ? profileData.email : null;
    const phone = profileData.phone !== undefined ? profileData.phone : null;
    
    console.log("Données à envoyer à Supabase profiles:", { id: userId, name, email, phone });
    
    // Mise à jour de la table profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: name,
        email: email,
        phone: phone,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    
    if (profileError) {
      console.error('Erreur Supabase lors de la mise à jour du profil:', profileError);
      return false;
    } else {
      console.log("Mise à jour du profil Supabase réussie");
    }
    
    // Préparer les données pour user_details
    const firstName = profileData.firstName || 
                      (name ? name.split(' ')[0] : null);
    const lastName = profileData.lastName || 
                    (name && name.split(' ').length > 1 ? 
                      name.split(' ').slice(1).join(' ') : null);
    
    console.log("Données à envoyer à Supabase user_details:", { 
      id: userId, 
      first_name: firstName, 
      last_name: lastName,
      address: profileData.address,
      city: profileData.city,
      postal_code: profileData.postalCode
    });
    
    // Mise à jour de la table user_details pour stocker les adresses et noms
    console.log("Mise à jour des détails utilisateur dans Supabase");
    const { error: detailsError } = await supabase
      .from('user_details')
      .upsert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        address: profileData.address || null,
        city: profileData.city || null,
        postal_code: profileData.postalCode || null,
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
    if (!userId || !supabase) {
      console.error('ID utilisateur ou instance Supabase invalide');
      return null;
    }
    
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
