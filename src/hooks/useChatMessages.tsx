
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useMessagesFetcher } from './useMessagesFetcher';
import { useMessageSender } from './useMessageSender';
import { toast } from 'sonner';

export interface Message {
  id: string;
  content: string;
  user_id: string;
  is_assistant: boolean;
  created_at: string;
  room_id?: string;
  user_name?: string; // Ajout du nom d'utilisateur
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeUsers, setActiveUsers] = useState<{[key: string]: {user_id: string, name?: string, last_active: string}>>({}); // État pour stocker les utilisateurs actifs
  const { user } = useAuth();
  
  // Use the separated hooks
  const { fetchMessages } = useMessagesFetcher(setMessages);
  const { sendMessage: sendNewMessage } = useMessageSender(user, setMessages, setLoading);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages('general');
    
    // Set up realtime subscription for new messages
    const messagesChannel = supabase
      .channel('public:messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.general`
      }, (payload) => {
        // Add the new message to state
        const newMessage = payload.new as Message;
        
        // Si c'est un nouveau message, mettre à jour la liste des utilisateurs actifs
        if (!newMessage.is_assistant) {
          setActiveUsers(prev => ({
            ...prev,
            [newMessage.user_id]: { 
              user_id: newMessage.user_id,
              name: newMessage.user_name || 'Utilisateur',
              last_active: new Date().toISOString()
            }
          }));
        }
        
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();
      
    // Canal spécifique pour la présence des utilisateurs
    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user?.id || 'anonymous',
        },
      },
    });

    // Lorsqu'un utilisateur se connecte, mettre à jour la liste des utilisateurs actifs
    if (user) {
      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          // Convertir l'état de présence en liste d'utilisateurs actifs
          const newActiveUsers = Object.keys(state).reduce((acc, key) => {
            const userInfo = state[key][0] as any; // Premier élément contient les infos
            acc[key] = { 
              user_id: key,
              name: userInfo.user_name || 'Utilisateur',
              last_active: new Date().toISOString()
            };
            return acc;
          }, {} as {[key: string]: {user_id: string, name?: string, last_active: string}});
          
          setActiveUsers(newActiveUsers);
        })
        .subscribe();

      // Tracker la présence de l'utilisateur courant
      presenceChannel.track({
        user_id: user.id,
        user_name: user.email?.split('@')[0] || 'Utilisateur'
      });
    }
    
    // Nettoyer les souscriptions
    return () => {
      supabase.removeChannel(messagesChannel);
      if (user) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [fetchMessages, user]);

  // Filtrer les utilisateurs actifs (actifs dans les dernières 5 minutes)
  const getActiveUsers = () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    return Object.values(activeUsers).filter(user => user.last_active > fiveMinutesAgo);
  };

  return {
    messages,
    loading,
    sendMessage: sendNewMessage,
    refreshMessages: () => fetchMessages('general'),
    activeUsers: getActiveUsers(),
  };
};
