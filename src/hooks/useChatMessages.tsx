
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
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  // Use the separated hooks
  const { fetchMessages } = useMessagesFetcher(setMessages);
  const { sendMessage: sendNewMessage } = useMessageSender(user, setMessages, setLoading);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages('general');
    
    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.general`
      }, (payload) => {
        // Add the new message to state if it's not from the current user
        const newMessage = payload.new as Message;
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

  return {
    messages,
    loading,
    sendMessage: sendNewMessage,
    refreshMessages: () => fetchMessages('general')
  };
};
