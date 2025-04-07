
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

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
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  session: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Utiliser setTimeout pour éviter les blocages potentiels
          setTimeout(async () => {
            try {
              // Vérifier si l'utilisateur a un rôle d'admin
              const { data, error } = await supabase
                .from('admin_roles')
                .select('*')
                .eq('user_id', newSession.user.id)
                .maybeSingle();
              
              if (data) {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
              
              // Récupérer les données utilisateur
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .maybeSingle();
              
              if (profile) {
                setUserData({
                  id: newSession.user.id,
                  name: profile.name,
                  email: newSession.user.email,
                  phone: profile.phone,
                  subscriptionType: profile.subscription_type || 'basic'
                });
              }
            } catch (error) {
              console.error("Erreur lors de la vérification des données de l'utilisateur:", error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUserData(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        // Utiliser setTimeout pour éviter les blocages potentiels
        setTimeout(async () => {
          try {
            // Vérifier si l'utilisateur a un rôle d'admin
            const { data, error } = await supabase
              .from('admin_roles')
              .select('*')
              .eq('user_id', existingSession.user.id)
              .maybeSingle();
            
            if (data) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
            
            // Récupérer les données utilisateur
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', existingSession.user.id)
              .maybeSingle();
            
            if (profile) {
              setUserData({
                id: existingSession.user.id,
                name: profile.name,
                email: existingSession.user.email,
                phone: profile.phone,
                subscriptionType: profile.subscription_type || 'basic'
              });
            }
          } catch (error) {
            console.error("Erreur lors de la vérification des données de l'utilisateur:", error);
          } finally {
            setLoading(false);
          }
        }, 0);
      } else {
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
      session
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
