
import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  ActionCodeSettings
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

// Improved password reset service with debugging
export const resetPassword = async (email: string) => {
  try {
    console.log("Début de la procédure de réinitialisation pour:", email);
    
    // Configuration pour l'email de réinitialisation
    const actionCodeSettings: ActionCodeSettings = {
      // URL de redirection après clic sur le lien (doit être autorisée dans la console Firebase)
      url: window.location.origin + '/auth/login',
      handleCodeInApp: true
    };
    
    console.log("Paramètres de réinitialisation:", actionCodeSettings);
    
    // Envoi de l'email avec les paramètres configurés
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    
    console.log("Email de réinitialisation envoyé avec succès");
    return { success: true };
  } catch (error: any) {
    console.error('Erreur détaillée lors de la réinitialisation du mot de passe:', error);
    let errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
    let errorCode = error.code || 'unknown';
    
    // Messages d'erreur plus précis
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte n\'est associé à cet email';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'L\'adresse email n\'est pas valide';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Trop de tentatives, veuillez réessayer plus tard';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: errorCode,
      details: error.message 
    };
  }
};

// Fonction pour connecter un utilisateur de manière sécurisée
export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Tentative de connexion pour:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Connexion réussie pour:", email);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Erreur de connexion détaillée:', error);
    let errorMessage = 'Échec de la connexion';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte n\'existe avec cet email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Mot de passe incorrect';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Trop de tentatives échouées. Compte temporairement bloqué.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'Ce compte a été désactivé.';
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: error.code || 'unknown',
      details: error.message 
    };
  }
};
