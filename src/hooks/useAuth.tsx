
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { useSupabaseAuth } from './useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';

// Étendre le type User pour inclure les propriétés manquantes
interface ExtendedUser extends User {
  // Ajout de la propriété uid pour compatibilité avec le code existant
  uid: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
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
  const { user: supabaseUser, userData, loading } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<ExtendedUser | null>(null);

  // Adapter l'utilisateur Supabase pour ajouter les propriétés manquantes
  useEffect(() => {
    if (supabaseUser) {
      // Créer un utilisateur étendu qui ajoute uid comme alias pour id
      const extendedUser = {
        ...supabaseUser,
        uid: supabaseUser.id, // Ajouter uid comme alias pour id
      } as ExtendedUser;
      
      setUser(extendedUser);
    } else {
      setUser(null);
    }
  }, [supabaseUser]);

  useEffect(() => {
    // Check if user has admin role
    const checkAdminRole = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.from('admin_roles')
            .select('*')
            .eq('user_id', user.id);
            
          // Check if the result contains data
          if (data && data.length > 0) {
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
