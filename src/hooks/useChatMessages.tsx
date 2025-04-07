
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
    if (user?.id) {
      fetchMessages(user.id);
    }
  }, [user?.id, fetchMessages]);

  return {
    messages,
    loading,
    sendMessage: sendNewMessage,
    fetchMessages: () => user?.id && fetchMessages(user.id)
  };
};
