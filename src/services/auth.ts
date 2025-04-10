
import { supabase } from '@/integrations/supabase/client';

// Login service
export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Tentative de connexion pour:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    console.log("Connexion réussie pour:", email);
    return { success: true, user: data.user, session: data.session };
  } catch (error: any) {
    console.error('Erreur de connexion détaillée:', error);
    
    let errorMessage = 'Échec de la connexion';
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Identifiants incorrects';
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Veuillez confirmer votre adresse email';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: error.code || 'unknown',
      details: error.message 
    };
  }
};

// Logout service
export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message };
  }
};

// Admin login service
export const loginAdmin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Vérifier si l'utilisateur est un administrateur
    const { data: isAdmin } = await supabase.rpc('has_role', { 
      _user_id: data.user.id, 
      _role: 'admin' 
    });
    
    if (!isAdmin) {
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

// Password reset service
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/new-password`,
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    
    let errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
    if (error.message.includes('user not found')) {
      errorMessage = 'Aucun compte n\'est associé à cet email';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: error.code || 'unknown',
      details: error.message
    };
  }
};

// Registration service
export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  try {
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
    }
    
    return {
      success: false,
      error: errorMessage,
      code: error.code,
      details: error.message
    };
  }
};

// Password update service
export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Complete password reset
export const completePasswordReset = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la confirmation de réinitialisation:", error);
    
    return {
      success: false,
      error: error.message,
      code: error.code || "unknown"
    };
  }
};
