
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

// AVERTISSEMENT: Cette fonction est incluse à titre informatif uniquement.
// Dans un environnement de production, la création de superadmins devrait
// être effectuée via Firebase Admin SDK sur le backend (Cloud Functions)
// pour des raisons de sécurité.

export const setupInitialSuperAdmin = async (email: string): Promise<boolean> => {
  try {
    // Vérifier si un document de configuration existe déjà
    const configRef = doc(db, 'system_config', 'admin_setup');
    const configSnap = await getDoc(configRef);
    
    if (configSnap.exists() && configSnap.data().initialized) {
      console.log("Configuration des superadmins déjà initialisée");
      return false;
    }
    
    // Dans un vrai système, vous rechercheriez l'utilisateur par email
    // puis utiliseriez Firebase Admin SDK pour définir les custom claims
    console.log(`Initialisation du superadmin pour: ${email}`);
    
    // Marquer la configuration comme initialisée
    await setDoc(configRef, {
      initialized: true,
      initialSuperAdminEmail: email,
      createdAt: new Date()
    });
    
    // Note: Pour implémenter ceci correctement, créez une Cloud Function Firebase
    // qui utilisera l'Admin SDK pour définir les custom claims:
    // admin.auth().getUserByEmail(email).then((user) => {
    //   return admin.auth().setCustomUserClaims(user.uid, { superadmin: true });
    // });
    
    console.log("Configuration du superadmin initialisée");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du superadmin:", error);
    return false;
  }
};

export const isSuperAdminSetupComplete = async (): Promise<boolean> => {
  try {
    const configRef = doc(db, 'system_config', 'admin_setup');
    const configSnap = await getDoc(configRef);
    
    return configSnap.exists() && configSnap.data().initialized;
  } catch (error) {
    console.error("Erreur lors de la vérification de la configuration superadmin:", error);
    return false;
  }
};
