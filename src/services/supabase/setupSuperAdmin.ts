
import { supabase } from '@/integrations/supabase/client';

export async function isSystemInitialized() {
  try {
    // Vérifier si le système est déjà initialisé
    const { data, error } = await supabase
      .from('system_config')
      .select('initialized')
      .eq('id', 'system')
      .single();

    if (error) {
      console.error("Erreur lors de la vérification de l'initialisation:", error);
      return false;
    }

    return data?.initialized === true;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'initialisation:", error);
    return false;
  }
}

export async function getInitialSuperadminEmail() {
  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('initial_superadmin_email')
      .eq('id', 'system')
      .single();

    if (error) {
      console.error("Erreur lors de la récupération de l'email du superadmin:", error);
      return null;
    }

    return data?.initial_superadmin_email || null;
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
    const { error: roleError } = await supabase
      .from('admin_roles')
      .insert({
        user_id: userId,
        role: 'superadmin',
      });

    if (roleError) {
      return { success: false, error: roleError.message };
    }

    // Marquer le système comme initialisé
    const { error: configError } = await supabase
      .from('system_config')
      .update({
        initialized: true,
        initial_superadmin_email: email,
      })
      .eq('id', 'system');

    if (configError) {
      return { success: false, error: configError.message };
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
    const { data, error } = await supabase
      .from('system_config')
      .select('*')
      .eq('id', 'system')
      .single();

    if (error && error.code !== 'PGRST116') {
      // Si l'erreur n'est pas "No rows returned", c'est une erreur inattendue
      console.error("Erreur lors de la vérification de la configuration du système:", error);
      return false;
    }

    // Si la configuration existe déjà, ne rien faire
    if (data) {
      return true;
    }

    // Créer la configuration initiale
    const { error: insertError } = await supabase
      .from('system_config')
      .insert({
        id: 'system',
        initialized: false,
      });

    if (insertError) {
      console.error("Erreur lors de l'initialisation de la configuration du système:", insertError);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la configuration du système:", error);
    return false;
  }
}
