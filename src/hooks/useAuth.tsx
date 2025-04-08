
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userData: any | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  isSuperAdmin: false,
  userData: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      setLoading(true);
      
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        return;
      }
      
      if (session) {
        setUser(session.user);
        setSession(session);
        
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_roles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();
          
        setIsAdmin(!!adminData);
        
        // Check if user is superadmin
        setIsSuperAdmin(adminData?.role === 'superadmin');
        
        // Get user profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setUserData({
            id: session.user.id,
            email: profileData.email,
            name: profileData.name,
            phone: profileData.phone,
            subscriptionType: profileData.subscription_type
          });
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(newSession?.user || null);
        setSession(newSession);
        
        if (newSession?.user) {
          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admin_roles')
            .select('*')
            .eq('user_id', newSession.user.id)
            .maybeSingle();
            
          setIsAdmin(!!adminData);
          setIsSuperAdmin(adminData?.role === 'superadmin');
          
          // Get user profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession.user.id)
            .single();
            
          if (profileData) {
            setUserData({
              id: newSession.user.id,
              email: profileData.email,
              name: profileData.name,
              phone: profileData.phone,
              subscriptionType: profileData.subscription_type
            });
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setUserData(null);
      }
    });
    
    // Clean up on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isSuperAdmin, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
