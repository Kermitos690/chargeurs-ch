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

// Password reset service - simplified version
export const resetPassword = async (email: string) => {
  try {
    console.log("Starting password reset process for:", email);
    
    // Simplified approach - no action code settings
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully");
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    let errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte n\'est associé à cet email';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'L\'adresse email n\'est pas valide';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Trop de tentatives, veuillez réessayer plus tard';
    }
    
    return { success: false, error: errorMessage, code: error.code };
  }
};
