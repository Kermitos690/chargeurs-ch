
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type UserProfile = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Récupérer les données du profil de base
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Erreur lors de la récupération du profil:', profileError);
    }

    // Récupérer les données détaillées de l'utilisateur
    // Note: on utilise la méthode "as any" temporairement pour contourner le problème de type
    // car la table user_details a été créée après la génération des types
    const { data: userDetails, error: detailsError } = await (supabase
      .from('user_details' as any)
      .select('*')
      .eq('id', userId)
      .single() as any);

    if (detailsError && detailsError.code !== 'PGRST116') { // PGRST116 = not found
      console.error("Erreur lors de la récupération des détails de l'utilisateur:", detailsError);
    }

    // Fusionner les données avec des noms de propriétés conformes aux conventions camelCase
    return {
      id: userId,
      firstName: userDetails?.first_name || profileData?.name?.split(' ')[0] || null,
      lastName: userDetails?.last_name || profileData?.name?.split(' ')[1] || null,
      phone: userDetails?.phone || profileData?.phone || null,
      address: userDetails?.address || null,
      city: userDetails?.city || null,
      postalCode: userDetails?.postal_code || null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil utilisateur:", error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string, 
  profileData: Partial<UserProfile>
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Mise à jour des détails utilisateur - on utilise as any pour contourner le problème de type
    const { error: detailsError } = await (supabase
      .from('user_details' as any)
      .upsert({
        id: userId,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        postal_code: profileData.postalCode,
        updated_at: new Date().toISOString(),
      }) as any);

    if (detailsError) {
      console.error("Erreur lors de la mise à jour des détails de l'utilisateur:", detailsError);
      return { success: false, error: detailsError.message };
    }

    // Mise à jour du profil de base
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
        phone: profileData.phone,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("Erreur lors de la mise à jour du profil:", profileError);
      return { success: false, error: profileError.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return { success: false, error: error.message };
  }
};
