
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  userData: {
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
  } | null;
  loading: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AuthContextType['userData']>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Vérifier la session actuelle
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        await checkUserRole(session.user.id);
        await fetchUserData(session.user.id);
      }
      setLoading(false);
    };

    checkSession();

    // S'abonner aux changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user);
        await checkUserRole(session.user.id);
        await fetchUserData(session.user.id);
      } else {
        setUser(null);
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Erreur vérification rôle admin:", error);
      setIsAdmin(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Récupérer le profil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      // Récupérer les détails utilisateur
      const { data: userDetails } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileData || userDetails) {
        setUserData({
          id: userId,
          name: profileData?.name,
          email: profileData?.email,
          phone: profileData?.phone,
          subscriptionType: profileData?.subscription_type,
          firstName: userDetails?.first_name,
          lastName: userDetails?.last_name,
          address: userDetails?.address,
          city: userDetails?.city,
          postalCode: userDetails?.postal_code
        });
      }
    } catch (error) {
      console.error('Erreur récupération données utilisateur:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      loading, 
      isAdmin, 
      isLoading: loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
