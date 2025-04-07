
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { transferCartToUser } from '@/services/cart';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  subscriptionType?: string;
}

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Clear user data if logged out
        if (event === 'SIGNED_OUT') {
          setUserData(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch user data if logged in
      if (currentSession?.user) {
        fetchUserData(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch additional user data when logged in
  useEffect(() => {
    if (user && !userData) {
      fetchUserData(user.id);
    }
    
    // Transfer cart when user logs in
    if (user?.id) {
      transferCartToUser(user.id).catch(error => {
        console.error("Erreur lors du transfert du panier:", error);
      });
    }
  }, [user?.id, userData]);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return;
      }
      
      if (data) {
        setUserData({
          id: userId,
          name: data.name,
          email: user?.email,
          phone: data.phone,
          subscriptionType: data.subscription_type
        });
      } else {
        // If no profile exists, use basic user data
        setUserData({
          id: userId,
          email: user?.email,
          name: user?.user_metadata?.name || user?.email?.split('@')[0]
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  return { user, userData, loading, session };
};
