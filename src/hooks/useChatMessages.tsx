
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

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useSupabaseAuth();
  const { fetchMessages } = useMessagesFetcher(setMessages);
  const { sendMessage } = useMessageSender(user, setMessages, setLoading);

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

  return { messages, loading, sendMessage, unreadCount, markAllAsRead };
};
