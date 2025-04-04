
import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  ActionCodeSettings,
  sendEmailVerification
} from 'firebase/auth';
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Export Firebase Auth functions
export { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification
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
    return { success: false, error: error.message, code: error.code };
  }
};

// Logout service
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message, code: error.code };
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
      url: `${window.location.origin}/auth/login`,
      handleCodeInApp: true
    };
    
    console.log("Paramètres de réinitialisation:", actionCodeSettings);
    console.log("URL de redirection configurée:", actionCodeSettings.url);
    
    // Vérifier si l'email existe dans notre base d'utilisateurs
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("Aucun utilisateur trouvé avec cet email, mais nous envoyons quand même un email pour des raisons de sécurité");
    } else {
      console.log("Utilisateur trouvé avec cet email, procédant à la réinitialisation");
    }
    
    // Envoi de l'email avec les paramètres configurés
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    
    console.log("Email de réinitialisation envoyé avec succès");
    
    // Enregistrer la tentative de réinitialisation pour le suivi
    try {
      await setDoc(doc(db, "passwordResetAttempts", new Date().toISOString()), {
        email,
        timestamp: new Date(),
        successful: true,
        userAgent: navigator.userAgent,
        ipAddress: "REDACTED" // Dans une vraie application, cela serait géré côté serveur
      });
    } catch (logError) {
      console.error("Erreur lors de l'enregistrement de la tentative de réinitialisation:", logError);
      // On ne fait pas échouer l'opération principale si le logging échoue
    }
    
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
    } else if (error.code === 'auth/missing-continue-uri') {
      errorMessage = 'Erreur de configuration: URL de redirection manquante';
    } else if (error.code === 'auth/unauthorized-continue-uri') {
      errorMessage = 'Erreur de configuration: URL de redirection non autorisée';
    }
    
    // Enregistrer l'échec pour analyse
    try {
      await setDoc(doc(db, "passwordResetAttempts", new Date().toISOString()), {
        email,
        timestamp: new Date(),
        successful: false,
        error: errorCode,
        errorDetails: error.message,
        userAgent: navigator.userAgent
      });
    } catch (logError) {
      console.error("Erreur lors de l'enregistrement de l'échec de réinitialisation:", logError);
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      code: errorCode,
      details: error.message,
      url: window.location.origin + '/auth/login' // Pour le débogage
    };
  }
};

// Fonction pour connecter un utilisateur de manière sécurisée
export const loginUser = async (email: string, password: string) => {
  // Suivi des tentatives de connexion
  const loginAttemptTracking = async (success: boolean, errorCode?: string) => {
    try {
      await setDoc(doc(db, "loginAttempts", new Date().toISOString()), {
        email,
        timestamp: new Date(),
        successful: success,
        errorCode: errorCode || null,
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error("Erreur lors du suivi de tentative de connexion:", error);
    }
  };
  
  try {
    console.log("Tentative de connexion pour:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Connexion réussie pour:", email);
    
    // Enregistrer la tentative réussie
    await loginAttemptTracking(true);
    
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
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Identifiants invalides. Vérifiez votre email et mot de passe.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
    }
    
    // Enregistrer la tentative échouée
    await loginAttemptTracking(false, error.code);
    
    return { 
      success: false, 
      error: errorMessage, 
      code: error.code || 'unknown',
      details: error.message 
    };
  }
};

// Fonction de création de compte avec vérification d'email
export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  try {
    console.log("Création d'un compte pour:", email);
    
    // Créer l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("Compte créé avec succès, uid:", user.uid);
    
    // Mettre à jour le profil avec le nom
    await updateProfile(user, { displayName: name });
    
    // Envoyer un email de vérification
    await sendEmailVerification(user);
    console.log("Email de vérification envoyé à:", email);
    
    // Créer un document utilisateur dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: email,
      name: name,
      phone: phone,
      emailVerified: false,
      subscriptionType: 'basic',
      createdAt: new Date()
    });
    
    return { 
      success: true, 
      user,
      message: "Compte créé avec succès. Veuillez vérifier votre email."
    };
  } catch (error: any) {
    console.error("Erreur lors de la création du compte:", error);
    
    // Messages d'erreur spécifiques
    let errorMessage = "Une erreur est survenue lors de l'inscription";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Cette adresse email est déjà utilisée";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Adresse email invalide";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Le mot de passe est trop faible (minimum 6 caractères)";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = "Problème de connexion réseau. Vérifiez votre connexion internet.";
    }
    
    return {
      success: false,
      error: errorMessage,
      code: error.code,
      details: error.message
    };
  }
};
