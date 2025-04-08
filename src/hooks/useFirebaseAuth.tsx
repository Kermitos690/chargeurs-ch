
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, authStateListener } from '@/services/firebase';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: Date;
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    let userDataUnsubscribe: (() => void) | null = null;
    let supabaseSubscription: { unsubscribe: () => void } | null = null;

    const authUnsubscribe = authStateListener(async (authUser) => {
      setLoading(true);
      
      // Nettoyer les abonnements précédents
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
        userDataUnsubscribe = null;
      }
      
      if (supabaseSubscription) {
        supabaseSubscription.unsubscribe();
        supabaseSubscription = null;
      }
      
      if (authUser) {
        setUser(authUser);
        
        try {
          // 1. Configuration de l'écoute temps réel pour Supabase
          try {
            // Vérifier si l'utilisateur existe dans Supabase
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', authUser.uid)
              .single();
              
            if (!existingProfile) {
              // Créer un profil de base dans Supabase si l'utilisateur n'existe pas
              await supabase.from('profiles').upsert({
                id: authUser.uid,
                name: authUser.displayName || undefined,
                email: authUser.email || undefined,
                subscription_type: 'basic',
                updated_at: new Date().toISOString()
              });
              
              // S'assurer que user_details existe également
              await supabase.from('user_details').upsert({
                id: authUser.uid,
                updated_at: new Date().toISOString()
              });
            }
            
            // Mettre en place un écouteur temps réel pour les changements de profil
            // Note: nous devons utiliser les hooks React Query dans un composant React
            // au lieu d'utiliser directement onSnapshot ici

            // Récupérer les données initiales du profil
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.uid)
              .single();
              
            const { data: userDetails } = await supabase
              .from('user_details')
              .select('*')
              .eq('id', authUser.uid)
              .single();
              
            if (profileData) {
              setUserData({
                id: authUser.uid,
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
                subscriptionType: profileData.subscription_type,
                firstName: userDetails?.first_name,
                lastName: userDetails?.last_name,
                address: userDetails?.address,
                city: userDetails?.city,
                postalCode: userDetails?.postal_code,
                updatedAt: profileData.updated_at ? new Date(profileData.updated_at) : undefined
              });
            }
          } catch (supabaseError) {
            console.error("Erreur lors de l'initialisation Supabase:", supabaseError);
          }
          
          // 2. Récupérer la référence du document utilisateur dans Firestore
          const userDocRef = doc(db, 'users', authUser.uid);
          
          // Vérifier si le document existe
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            // Si nous n'avons pas déjà défini les données depuis Supabase
            if (!userData) {
              // Définir les données utilisateur initiales depuis Firestore
              const userDataFromFirestore = userDocSnap.data();
              setUserData({ 
                id: authUser.uid,
                ...userDataFromFirestore as Omit<UserData, 'id'>
              });
            }
            
            // Mettre en place un écouteur temps réel pour les mises à jour futures dans Firestore
            userDataUnsubscribe = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                const firestoreData = doc.data();
                setUserData(prevData => ({ 
                  id: authUser.uid,
                  ...prevData, // Conserver les données Supabase
                  ...firestoreData as Omit<UserData, 'id'>,
                }));
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
            
            // Si nous n'avons pas déjà défini les données depuis Supabase
            if (!userData) {
              // Définir les données utilisateur initiales
              setUserData({ 
                id: authUser.uid,
                ...basicUserData
              });
            }
            
            // Mettre en place un écouteur temps réel pour les mises à jour futures
            userDataUnsubscribe = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                const firestoreData = doc.data();
                setUserData(prevData => ({ 
                  id: authUser.uid,
                  ...prevData, // Conserver les données Supabase
                  ...firestoreData as Omit<UserData, 'id'>,
                }));
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
      if (supabaseSubscription) {
        supabaseSubscription.unsubscribe();
      }
    };
  }, []);

  return { user, userData, loading };
};
