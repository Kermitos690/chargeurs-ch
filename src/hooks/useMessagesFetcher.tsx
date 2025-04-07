
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from './useChatMessages';

export const useMessagesFetcher = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const fetchMessages = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our Message interface
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          user_id: msg.user_id,
          // Fix: Explicitly handle is_assistant as a boolean
          is_assistant: msg.is_assistant === true,
          created_at: msg.created_at,
          room_id: msg.room_id
        }));
        
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    }
  }, [setMessages]);

  return { fetchMessages };
};
