
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { isSuperAdmin } from '@/services/supabase/superAdmin';
import type { ProfileRow, UserInfo, AuthUser, AuthSession } from '@/types/supabaseTypes.d';

interface AuthContextType {
  user: AuthUser | null;
  userData: UserInfo | null;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userIsSuperAdmin, setUserIsSuperAdmin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(true);

        if (newSession?.user) {
          setTimeout(async () => {
            try {
              const { data: adminData, error: adminError } = await supabase.rpc('has_role', { 
                _user_id: newSession.user.id,
                _role: 'admin'
              });
              
              setIsAdmin(adminData || false);
              
              const superAdmin = await isSuperAdmin(newSession.user);
              setUserIsSuperAdmin(superAdmin);
              
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
              
              if (profileData && !profileError) {
                const profile = profileData as ProfileRow;
                setUserData({
                  id: profile.id,
                  name: profile.name || undefined,
                  email: profile.email || undefined,
                  phone: profile.phone || undefined,
                  subscriptionType: profile.subscription_type || undefined
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
