
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from './useFirebaseAuth';
import { supabase } from '@/integrations/supabase/client';

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
    const checkAdminRole = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.from('admin_roles')
            .select('*')
            .eq('user_id', user.uid)
            .maybeSingle();
            
          // Vérifiez si le résultat contient des données
          if (data) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
