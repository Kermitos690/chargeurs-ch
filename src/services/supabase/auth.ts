
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define clear return types for authentication functions
export type AuthResult = 
  | { success: true; message?: string; user?: any; role?: string }
  | { success: false; error: string };

export const loginWithSupabase = async (email: string, password: string): Promise<AuthResult> => {
  try {
    console.log("Tentative de connexion avec:", { email });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Erreur de connexion Supabase:", error);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "Erreur lors de la connexion" };
    }

    // Vérifier si l'utilisateur a un rôle d'admin
    const { data: adminRole, error: roleError } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (roleError) {
      console.error("Erreur lors de la vérification du rôle:", roleError);
      // Ne pas déconnecter l'utilisateur car cela peut être dû à un problème de BDD temporaire
      return { success: false, error: "Erreur de vérification des droits d'accès" };
    }

    if (!adminRole) {
      // Déconnexion car l'utilisateur n'est pas admin
      await supabase.auth.signOut();
      return { success: false, error: "Vous n'avez pas les droits d'administration" };
    }

    return { success: true, user: data.user, role: adminRole.role };
  } catch (error: any) {
    console.error("Erreur critique lors de la connexion:", error);
    return { success: false, error: error.message || "Erreur de connexion" };
  }
};

export const isAdminUser = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error("Erreur de vérification du rôle admin:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Erreur lors de la vérification du statut admin:", error);
    return false;
  }
};

export const logoutFromSupabase = async (): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(`Erreur lors de la déconnexion: ${error.message}`);
      return { success: false, error: error.message };
    }
    
    toast.success('Déconnexion réussie');
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion:", error);
    return { success: false, error: error.message || "Erreur de déconnexion" };
  }
};

export const createAdminAccount = async (email: string, password: string, role: 'admin' | 'superadmin' = 'admin'): Promise<AuthResult> => {
  try {
    // Créer un nouvel utilisateur
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: role === 'superadmin' ? 'Super Administrateur' : 'Administrateur',
        }
      }
    });

    if (error) {
      console.error("Erreur lors de la création du compte:", error);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "Erreur lors de la création de l'utilisateur" };
    }

    // Attribuer le rôle d'admin
    const { error: roleError } = await supabase
      .from('admin_roles')
      .insert({
        user_id: data.user.id,
        role: role
      });

    if (roleError) {
      console.error("Erreur lors de l'attribution du rôle:", roleError);
      return { success: false, error: "Erreur lors de l'attribution du rôle d'administrateur" };
    }

    // Créer le profil utilisateur
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        name: role === 'superadmin' ? 'Super Administrateur' : 'Administrateur',
        email: email
      });

    if (profileError) {
      console.error("Erreur lors de la création du profil:", profileError);
    }

    return { 
      success: true, 
      message: "Compte administrateur créé avec succès."
    };
  } catch (error: any) {
    console.error("Erreur critique lors de la création du compte:", error);
    return { success: false, error: error.message || "Erreur lors de la création du compte" };
  }
};

export const resetPassword = async (email: string): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/new-password`,
    });

    if (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation." 
    };
  } catch (error: any) {
    console.error("Erreur lors de la réinitialisation:", error);
    return { success: false, error: error.message || "Erreur de réinitialisation" };
  }
};

export const updatePassword = async (newPassword: string): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      message: "Mot de passe mis à jour avec succès" 
    };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour:", error);
    return { success: false, error: error.message || "Erreur de mise à jour" };
  }
};
