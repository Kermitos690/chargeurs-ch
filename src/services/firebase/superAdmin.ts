
import { User, getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

// Vérifie si un utilisateur a le rôle de superadmin
export const isSuperAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  
  try {
    // Vérifier d'abord les custom claims (méthode privilégiée pour les rôles)
    const tokenResult = await user.getIdTokenResult();
    if (tokenResult.claims.superadmin) {
      return true;
    }
    
    // Vérifier également dans Firestore au cas où les custom claims ne seraient pas encore propagés
    const userDocRef = doc(db, 'admin_roles', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists() && userDocSnap.data().role === 'superadmin') {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erreur lors de la vérification des droits superadmin:", error);
    return false;
  }
};

// Cette fonction serait normalement utilisée par un Cloud Function Firebase
// et n'est pas destinée à être appelée directement depuis le frontend
// Elle est incluse ici pour référence uniquement
export const setSuperAdminRole = async (userId: string, isSuperAdmin: boolean): Promise<boolean> => {
  try {
    // Mise à jour du document dans Firestore
    await setDoc(doc(db, 'admin_roles', userId), {
      role: isSuperAdmin ? 'superadmin' : 'admin',
      updatedAt: new Date()
    }, { merge: true });
    
    // En production, vous utiliseriez également Firebase Admin SDK pour définir des custom claims
    // Ce qui nécessiterait une Cloud Function Firebase
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la définition du rôle superadmin:", error);
    return false;
  }
};
