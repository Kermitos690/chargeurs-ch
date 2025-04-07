
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from './useFirebaseAuth';

interface AuthContextType {
  user: User | null;
  userData: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    subscriptionType?: string;
  } | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, userData, loading } = useFirebaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user has admin role
    if (user) {
      user.getIdTokenResult()
        .then((idTokenResult) => {
          // Check if admin custom claim exists
          setIsAdmin(!!idTokenResult.claims.admin);
        })
        .catch((error) => {
          console.error("Error getting token claims:", error);
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
