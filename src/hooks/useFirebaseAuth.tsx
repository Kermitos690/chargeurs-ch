
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '@/services/firebase/config';
import { onAuthStateChanged } from '@/services/firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(true);
      
      if (authUser) {
        setUser(authUser);
        
        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserData({ 
              id: authUser.uid,
              ...userDocSnap.data() as Omit<UserData, 'id'>
            });
          } else {
            // Create basic user data if doesn't exist in Firestore
            setUserData({ 
              id: authUser.uid,
              email: authUser.email || undefined,
              name: authUser.displayName || undefined
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, userData, loading };
};
