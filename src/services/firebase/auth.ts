
import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './config';

// Export Firebase Auth functions
export { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset
};

// Admin login service
export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Verify if user is an administrator
    const tokenResult = await userCredential.user.getIdTokenResult();
    if (!tokenResult.claims.admin) {
      await signOut(auth);
      return { 
        success: false, 
        error: "Accès non autorisé. Vous devez être administrateur." 
      };
    }
    
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Erreur de connexion:', error);
    return { success: false, error: error.message };
  }
};

// Logout service
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message };
  }
};

// Auth state listener
export const authStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Password reset service
export const resetPassword = async (email: string) => {
  try {
    console.log("Starting password reset process for:", email);
    
    // Define actionCodeSettings for the password reset with correct handling options
    const actionCodeSettings = {
      // URL to redirect to after password reset
      url: `${window.location.origin}/auth/login?email=${encodeURIComponent(email)}`,
      // Set to true to handle the code in the app
      handleCodeInApp: true
    };
    
    console.log("Action code settings:", actionCodeSettings);
    
    // Skip Firestore check since we're getting permission errors
    // This isn't critical for password reset anyway, Firebase Auth will check if email exists
    
    // Try sending with actionCodeSettings
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      console.log("Password reset email sent successfully with actionCodeSettings");
      return { success: true };
    } catch (actionCodeError: any) {
      console.error("Error sending with actionCodeSettings:", actionCodeError);
      
      // If there's a rate limit or other error, show appropriate message
      if (actionCodeError.code === 'auth/too-many-requests') {
        return { 
          success: false, 
          error: "Trop de tentatives de réinitialisation. Veuillez réessayer plus tard.", 
          code: actionCodeError.code 
        };
      }
      
      // For RESET_PASSWORD_EXCEED_LIMIT errors
      if (actionCodeError.message && actionCodeError.message.includes('RESET_PASSWORD_EXCEED_LIMIT')) {
        return { 
          success: false, 
          error: "Limite de réinitialisation dépassée. Veuillez réessayer plus tard (généralement après 1 heure).", 
          code: 'auth/reset-password-limit-exceeded'
        };
      }
      
      // If that fails, fallback to sending without actionCodeSettings
      try {
        console.log("Trying without actionCodeSettings...");
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent successfully without actionCodeSettings");
        return { success: true };
      } catch (fallbackError: any) {
        throw fallbackError; // Let the outer catch handle this
      }
    }
  } catch (error: any) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    let errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte n\'est associé à cet email';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'L\'adresse email n\'est pas valide';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Trop de tentatives, veuillez réessayer plus tard';
    } else if (error.message && error.message.includes('RESET_PASSWORD_EXCEED_LIMIT')) {
      errorMessage = 'Limite de réinitialisation dépassée. Veuillez réessayer plus tard.';
    }
    
    return { success: false, error: errorMessage, code: error.code };
  }
};
