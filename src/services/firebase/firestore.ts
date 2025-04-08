
import { 
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
import { db } from './config';

// Document retrieval
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

// Collection retrieval with optional filtering, sorting, and limiting
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

// Document creation
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

// Document update
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

// Document deletion
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { success: true };
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du document ${docId}:`, error);
    return { success: false, error: error.message };
  }
};
