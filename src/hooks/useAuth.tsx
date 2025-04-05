
import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { isSuperAdmin } from '@/services/supabase/superAdmin';

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
  isSuperAdmin: boolean;
  isLoading: boolean; // Added for compatibility
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  isSuperAdmin: false,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<AuthContextType['userData']>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userIsSuperAdmin, setUserIsSuperAdmin] = useState(false);

  useEffect(() => {
    // Première étape : définir le listener pour les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(true);

        if (newSession?.user) {
          // Vérifier les rôles après un délai pour éviter une boucle infinie
          setTimeout(async () => {
            try {
              // Vérifier si l'utilisateur est admin
              const { data: adminData, error: adminError } = await supabase.rpc('has_role', { 
                _user_id: newSession.user.id,
                _role: 'admin'
              });
              
              setIsAdmin(adminData || false);
              
              // Vérifier si l'utilisateur est superadmin
              const superAdmin = await isSuperAdmin(newSession.user);
              setUserIsSuperAdmin(superAdmin);
              
              // Récupérer les données du profil utilisateur
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
              
              if (profileData && !profileError) {
                setUserData({
                  id: profileData.id,
                  name: profileData.name,
                  email: profileData.email,
                  phone: profileData.phone,
                  subscriptionType: profileData.subscription_type
                });
              }
            } catch (error) {
              console.error("Erreur lors de la vérification des rôles:", error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUserData(null);
          setIsAdmin(false);
          setUserIsSuperAdmin(false);
          setLoading(false);
        }
      }
    );

    // Deuxième étape : vérifier la session existante
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (!currentSession) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      loading, 
      isAdmin, 
      isSuperAdmin: userIsSuperAdmin,
      isLoading: loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
