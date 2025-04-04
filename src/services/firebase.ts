import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp,
  CollectionReference,
  DocumentData
} from 'firebase/firestore';

// Configuration Firebase avec votre clé API
// Important: Complétez ces valeurs depuis votre console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLcFXeCYGpNQzAAA7s_ilZYHvh3_EZa_Y",
  authDomain: "chargeurs-ch.firebaseapp.com", // À remplacer par votre auth domain
  projectId: "chargeurs-ch", // À remplacer par votre project ID
  storageBucket: "chargeurs-ch.appspot.com", // À remplacer par votre storage bucket
  messagingSenderId: "123456789", // À remplacer par votre messaging sender ID
  appId: "1:123456789:web:abc123def456" // À remplacer par votre app ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Service d'authentification
export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Vérifier si l'utilisateur est un administrateur
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

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message };
  }
};

// Hook personnalisé pour l'authentification
export const authStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Services Firestore
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Document non trouvé" };
    }
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du document ${docId}:`, error);
    return { success: false, error: error.message };
  }
};

export const getCollection = async (
  collectionName: string, 
  conditions: { field: string, operator: string, value: any }[] = [],
  sortField?: string,
  sortDirection?: 'asc' | 'desc',
  limitCount?: number
) => {
  try {
    let collectionRef = collection(db, collectionName);
    
    // Build query with constraints if needed
    if (conditions.length > 0 || sortField || limitCount) {
      const queryConstraints = [];
      
      // Add conditions
      conditions.forEach(condition => {
        queryConstraints.push(where(condition.field, condition.operator as any, condition.value));
      });
      
      // Add sorting
      if (sortField) {
        queryConstraints.push(orderBy(sortField, sortDirection || 'asc'));
      }
      
      // Add limit
      if (limitCount) {
        queryConstraints.push(limit(limitCount));
      }
      
      const q = query(collectionRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: docs };
    } else {
      // Simple collection fetch without constraints
      const querySnapshot = await getDocs(collectionRef);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: docs };
    }
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la collection ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error(`Erreur lors de l'ajout du document dans ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour du document ${docId}:`, error);
    return { success: false, error: error.message };
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du document ${docId}:`, error);
    return { success: false, error: error.message };
  }
};

// Convertisseurs pour Firestore Timestamp
export const fromTimestamp = (timestamp: Timestamp) => {
  return timestamp ? timestamp.toDate() : null;
};

export const toTimestamp = (date: Date) => {
  return date ? Timestamp.fromDate(date) : null;
};
