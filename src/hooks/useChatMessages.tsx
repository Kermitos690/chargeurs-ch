
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMessagesFetcher } from './useMessagesFetcher';
import { useMessageSender } from './useMessageSender';
import { useSupabaseAuth } from './useSupabaseAuth';

export interface Message {
  id: string;
  content: string;
  user_id: string;
  is_assistant: boolean;
  created_at: string;
  room_id: string;
  user_name?: string;
}

export interface ActiveUser {
  user_id: string;
  name?: string;
  last_active: string;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const { user } = useSupabaseAuth();
  const { fetchMessages } = useMessagesFetcher(setMessages);
  const { sendMessage } = useMessageSender(user, setMessages, setLoading);

  // Fonction pour simuler les utilisateurs actifs
  // Dans une application réelle, cela utiliserait Supabase Presence
  useEffect(() => {
    // Simuler quelques utilisateurs actifs pour la démo
    if (user) {
      const mockActiveUsers: ActiveUser[] = [
        {
          user_id: user.id,
          name: user.email?.split('@')[0] || 'Vous',
          last_active: new Date().toISOString()
        }
      ];
      
      // Ajouter des utilisateurs fictifs pour la démo
      if (Math.random() > 0.5) {
        mockActiveUsers.push({
          user_id: 'user-2',
          name: 'Marie',
          last_active: new Date().toISOString()
        });
      }
      
      if (Math.random() > 0.3) {
        mockActiveUsers.push({
          user_id: 'user-3',
          name: 'Jean',
          last_active: new Date().toISOString()
        });
      }
      
      if (Math.random() > 0.7) {
        mockActiveUsers.push({
          user_id: 'user-4',
          name: 'Sophie',
          last_active: new Date().toISOString()
        });
      }
      
      setActiveUsers(mockActiveUsers);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMessages();
      
      // Subscribe to new messages
      const channel = supabase
        .channel('public:messages')
        .on(
          'postgres_changes',
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages' 
          },
          (payload) => {
            const newMessage = payload.new as Message;
            
            // Only increment unread if it's not from the current user
            if (newMessage.user_id !== user.id) {
              setUnreadCount((prev) => prev + 1);
            }
            
            // Add the new message to the messages state
            setMessages((prev) => [...prev, newMessage]);
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, fetchMessages]);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return { messages, loading, sendMessage, unreadCount, markAllAsRead, activeUsers };
};
