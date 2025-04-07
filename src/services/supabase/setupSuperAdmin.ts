
import { supabase } from '@/integrations/supabase/client';

export async function isSystemInitialized() {
  try {
    // Vérifier si le système est déjà initialisé
    const response = await supabase
      .from('system_config')
      .select('initialized')
      .eq('id', 'system')
      .single();

    if (response.error) {
      console.error("Erreur lors de la vérification de l'initialisation:", response.error);
      return false;
    }

    return response.data?.initialized === true;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'initialisation:", error);
    return false;
  }
}

export async function getInitialSuperadminEmail() {
  try {
    const response = await supabase
      .from('system_config')
      .select('initial_superadmin_email')
      .eq('id', 'system')
      .single();

    if (response.error) {
      console.error("Erreur lors de la récupération de l'email du superadmin:", response.error);
      return null;
    }

    return response.data?.initial_superadmin_email || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'email du superadmin:", error);
    return null;
  }
}

export async function setupNewSuperAdmin(email: string, password: string, name: string) {
  try {
    // Créer un nouvel utilisateur
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (userError) {
      return { success: false, error: userError.message };
    }

    if (!userData || !userData.user) {
      return { success: false, error: "Erreur lors de la création de l'utilisateur" };
    }

    const userId = userData.user.id;

    // Ajouter l'utilisateur comme superadmin
    const roleResponse = await supabase
      .from('admin_roles')
      .insert({
        user_id: userId,
        role: 'superadmin',
      });

    if (roleResponse.error) {
      return { success: false, error: roleResponse.error.message };
    }

    // Marquer le système comme initialisé
    const configResponse = await supabase
      .from('system_config')
      .update({
        initialized: true,
        initial_superadmin_email: email,
      })
      .eq('id', 'system');

    if (configResponse.error) {
      return { success: false, error: configResponse.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la configuration du superadmin:", error);
    return { success: false, error: error.message || "Erreur inconnue" };
  }
}

export async function initializeSystemConfigIfNeeded() {
  try {
    // Vérifier si la configuration du système existe déjà
    const response = await supabase
      .from('system_config')
      .select('*')
      .eq('id', 'system')
      .single();

    // Si aucune erreur ne survient, la configuration existe déjà
    if (!response.error) {
      return true;
    }

    // Créer la configuration initiale uniquement si l'erreur est "No rows returned"
    const insertResponse = await supabase
      .from('system_config')
      .insert({
        id: 'system',
        initialized: false,
      });

    if (insertResponse.error) {
      console.error("Erreur lors de l'initialisation de la configuration du système:", insertResponse.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la configuration du système:", error);
    return false;
  }
}
