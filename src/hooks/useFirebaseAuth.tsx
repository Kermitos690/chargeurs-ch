
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, authStateListener } from '@/services/firebase';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  updatedAt?: Date;
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    let userDataUnsubscribe: (() => void) | null = null;

    const authUnsubscribe = authStateListener(async (authUser) => {
      setLoading(true);
      
      // Nettoyer l'abonnement précédent si existant
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
        userDataUnsubscribe = null;
      }
      
      if (authUser) {
        setUser(authUser);
        
        try {
          // Récupérer la référence du document utilisateur
          const userDocRef = doc(db, 'users', authUser.uid);
          
          // Vérifier si le document existe
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            // Définir les données utilisateur initiales
            const userDataFromFirestore = userDocSnap.data();
            setUserData({ 
              id: authUser.uid,
              ...userDataFromFirestore as Omit<UserData, 'id'>
            });
            
            // Mettre en place un écouteur temps réel pour les mises à jour futures
            userDataUnsubscribe = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                setUserData({ 
                  id: authUser.uid,
                  ...doc.data() as Omit<UserData, 'id'>
                });
              }
            });
          } else {
            // Créer des données utilisateur de base si elles n'existent pas dans Firestore
            const basicUserData: Omit<UserData, 'id'> = {
              email: authUser.email || undefined,
              name: authUser.displayName || undefined,
              subscriptionType: 'basic',
              updatedAt: new Date()
            };
            
            // Enregistrer les données utilisateur de base dans Firestore
            await setDoc(userDocRef, basicUserData);
            
            // Définir les données utilisateur initiales
            setUserData({ 
              id: authUser.uid,
              ...basicUserData
            });
            
            // Mettre en place un écouteur temps réel pour les mises à jour futures
            userDataUnsubscribe = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                setUserData({ 
                  id: authUser.uid,
                  ...doc.data() as Omit<UserData, 'id'>
                });
              }
            });
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => {
      authUnsubscribe();
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
    };
  }, []);

  return { user, userData, loading };
};
