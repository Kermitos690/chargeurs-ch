import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  ActionCodeSettings,
  confirmPasswordReset
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
  setDoc,
  CollectionReference,
  DocumentData
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLcFXeCYGpNQzAAA7s_ilZYHvh3_EZa_Y",
  authDomain: "chargeurs-ch.firebaseapp.com",
  projectId: "chargeurs-ch",
  storageBucket: "chargeurs-ch.firebasestorage.app",
  messagingSenderId: "747950560072",
  appId: "1:747950560072:web:bd6491ecb116b97a2e997d",
  measurementId: "G-345SEMH8Q3"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Exporter les fonctions Firebase Auth nécessaires
export { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset
};

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

// Service de réinitialisation du mot de passe
export const resetPassword = async (email: string) => {
  try {
    // Nous n'utilisons pas ActionCodeSettings car cela peut causer des problèmes
    // avec certaines configurations Firebase
    console.log("Starting password reset process for:", email);
    
    // Vérifier d'abord si l'utilisateur existe dans Firestore
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log("No user found with this email in Firestore");
        // Continuer quand même avec la réinitialisation, Firebase Auth vérifiera si l'email existe
      } else {
        console.log("User found in Firestore with this email");
      }
    } catch (firestoreError) {
      console.error("Error checking user in Firestore:", firestoreError);
      // Continuer quand même avec la réinitialisation
    }
    
    // Envoyer l'email de réinitialisation sans ActionCodeSettings spécifiques
    // Firebase utilisera les paramètres par défaut configurés dans la console Firebase
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

// Services Firebase Storage
export const uploadFile = async (
  folder: string,
  file: File,
  fileName?: string,
  metadata?: any
) => {
  try {
    const name = fileName || `${Date.now()}_${file.name}`;
    const path = `${folder}/${name}`;
    const storageRef = ref(storage, path);
    
    await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    
    return { 
      success: true, 
      data: { 
        url: downloadURL, 
        path: path, 
        fileName: name 
      } 
    };
  } catch (error: any) {
    console.error("Erreur lors du téléchargement du fichier:", error);
    return { success: false, error: error.message };
  }
};

export const getFileUrl = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'URL du fichier:", error);
    return { success: false, error: error.message };
  }
};

export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la suppression du fichier:", error);
    return { success: false, error: error.message };
  }
};

export const listFiles = async (folderPath: string) => {
  try {
    const storageRef = ref(storage, folderPath);
    const fileList = await listAll(storageRef);
    
    const urls = await Promise.all(
      fileList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {
          name: item.name,
          fullPath: item.fullPath,
          url
        };
      })
    );
    
    return { success: true, files: urls };
  } catch (error: any) {
    console.error("Erreur lors de la liste des fichiers:", error);
    return { success: false, error: error.message };
  }
};
