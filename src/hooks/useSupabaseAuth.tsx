
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
}

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

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
        
        try {
          // Fetch user profile from 'profiles' table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
          } else if (profileData) {
            setUserData({
              id: session.user.id,
              name: profileData.name,
              email: profileData.email,
              phone: profileData.phone,
              subscriptionType: profileData.subscription_type
            });
          }
        } catch (error) {
          console.error("Error in profile data fetch:", error);
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (newSession?.user) {
          setUser(newSession.user);
          
          try {
            // Fetch user profile
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', newSession.user.id)
              .single();
            
            if (profileError) {
              console.error("Error fetching user profile:", profileError);
            } else if (profileData) {
              setUserData({
                id: newSession.user.id,
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
                subscriptionType: profileData.subscription_type
              });
            }
          } catch (error) {
            console.error("Error in profile data fetch:", error);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserData(null);
      }
    });
    
    // Clean up on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, userData, loading };
};
