
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Les identifiants par défaut pour le premier compte admin
const DEFAULT_ADMIN_EMAIL = 'admin@chargeurs.ch';
const DEFAULT_ADMIN_PASSWORD = 'Admin123!';

/**
 * Crée un compte administrateur initial si aucun n'existe déjà
 */
export const createInitialAdmin = async (): Promise<boolean> => {
  try {
    // Vérifier si un compte admin existe déjà
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_roles')
      .select('count')
      .single();

    if (checkError) {
      console.error("Erreur lors de la vérification des admins existants:", checkError);
      return false;
    }

    // Si des admins existent déjà, ne rien faire
    if (existingAdmins && existingAdmins.count > 0) {
      console.log("Des comptes admin existent déjà");
      return false;
    }

    // Créer un nouvel utilisateur
    const { data, error } = await supabase.auth.signUp({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
    });

    if (error) {
      console.error("Erreur lors de la création du compte admin:", error);
      return false;
    }

    if (!data.user) {
      console.error("Erreur: aucun utilisateur créé");
      return false;
    }

    // Attribuer le rôle de superadmin
    const { error: roleError } = await supabase
      .from('admin_roles')
      .insert({
        user_id: data.user.id,
        role: 'superadmin'
      });

    if (roleError) {
      console.error("Erreur lors de l'attribution du rôle d'admin:", roleError);
      return false;
    }

    console.log("Compte admin initial créé avec succès");
    return true;
  } catch (error) {
    console.error("Erreur inattendue lors de la création du compte admin:", error);
    return false;
  }
};

/**
 * Récupère les identifiants par défaut pour l'admin
 */
export const getDefaultAdminCredentials = () => {
  return {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD
  };
};

/**
 * Vérifie si des comptes admin existent dans le système
 */
export const checkAdminAccountsExist = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('count')
      .single();

    if (error) {
      console.error("Erreur lors de la vérification des comptes admin:", error);
      return false;
    }

    return data && data.count > 0;
  } catch (error) {
    console.error("Erreur lors de la vérification des comptes admin:", error);
    return false;
  }
};
