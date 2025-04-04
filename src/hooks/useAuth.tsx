
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, authStateListener } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = authStateListener((authUser) => {
      setUser(authUser);
      
      // Check if user has admin role
      if (authUser) {
        authUser.getIdTokenResult()
          .then((idTokenResult) => {
            // Check if admin custom claim exists
            setIsAdmin(!!idTokenResult.claims.admin);
          })
          .catch((error) => {
            console.error("Error getting token claims:", error);
            setIsAdmin(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, isAdmin };
};
