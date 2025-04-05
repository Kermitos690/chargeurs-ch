
import { supabase } from '@/integrations/supabase/client';
import type { AdminRoleRow } from '@/types/supabaseTypes.d';

// Service de connexion pour l'administration
export const loginAdmin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Vérifier si l'utilisateur est administrateur
    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
      _user_id: data.user.id,
      _role: 'admin'
    });
    
    if (roleError) throw roleError;
    
    if (!isAdmin) {
      // Si l'utilisateur n'est pas admin, déconnexion
      await supabase.auth.signOut();
      return { 
        success: false, 
        error: "Accès non autorisé. Vous devez être administrateur." 
      };
    }
    
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('Erreur de connexion:', error);
    return { success: false, error: error.message, code: error.code };
  }
};

// Service de déconnexion
export const logoutAdmin = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message, code: error.code };
  }
};

// Service de réinitialisation de mot de passe
export const resetPassword = async (email: string) => {
  try {
    console.log("Début de la procédure de réinitialisation pour:", email);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur détaillée lors de la réinitialisation du mot de passe:', error);
    
    let errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
    let errorCode = error.code || 'unknown';
    
    if (error.message.includes('user not found')) {
      errorMessage = 'Aucun compte n\'est associé à cet email';
    } else if (error.message.includes('invalid email')) {
      errorMessage = 'L\'adresse email n\'est pas valide';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: errorCode,
      details: error.message
    };
  }
};

// Confirmation de la réinitialisation du mot de passe
export const completePasswordReset = async (oobCode: string, newPassword: string) => {
  try {
    console.log("Mise à jour du mot de passe...");
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    console.log("Mot de passe réinitialisé avec succès");
    
    return { 
      success: true,
      email: 'utilisateur@example.com' // Supabase ne renvoie pas l'email, on pourrait le récupérer autrement
    };
  } catch (error: any) {
    console.error("Erreur lors de la confirmation de réinitialisation:", error);
    
    let errorMessage = "Une erreur est survenue lors de la réinitialisation du mot de passe";
    let errorCode = error.code || "unknown";
    
    if (error.message.includes('Password should be')) {
      errorMessage = "Le mot de passe est trop faible. Utilisez au moins 6 caractères.";
    }
    
    return {
      success: false,
      error: errorMessage,
      code: errorCode,
      details: error.message
    };
  }
};

// Connexion d'un utilisateur
export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Tentative de connexion pour:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    console.log("Connexion réussie pour:", email);
    
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('Erreur de connexion détaillée:', error);
    
    let errorMessage = 'Échec de la connexion';
    let errorCode = error.code || 'unknown';
    
    if (error.message.includes('user not found')) {
      errorMessage = 'Aucun compte n\'existe avec cet email';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Mot de passe incorrect';
    } else if (error.message.includes('too many requests')) {
      errorMessage = 'Trop de tentatives échouées. Compte temporairement bloqué.';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: errorCode,
      details: error.message 
    };
  }
};

// Création de compte utilisateur
export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  try {
    console.log("Création d'un compte pour:", email);
    
    // Créer l'utilisateur dans Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
    
    console.log("Compte créé avec succès, uid:", data.user.id);
    
    return { 
      success: true, 
      user: data.user,
      message: "Compte créé avec succès. Veuillez vérifier votre email."
    };
  } catch (error: any) {
    console.error("Erreur lors de la création du compte:", error);
    
    let errorMessage = "Une erreur est survenue lors de l'inscription";
    
    if (error.message.includes('already registered')) {
      errorMessage = "Cette adresse email est déjà utilisée";
    } else if (error.message.includes('invalid email')) {
      errorMessage = "Adresse email invalide";
    } else if (error.message.includes('Password should be')) {
      errorMessage = "Le mot de passe est trop faible (minimum 6 caractères)";
    }
    
    return {
      success: false,
      error: errorMessage,
      code: error.code,
      details: error.message
    };
  }
};
