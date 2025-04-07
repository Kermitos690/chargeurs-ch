
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from './useChatMessages';

export const useMessagesFetcher = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const fetchMessages = useCallback(async (roomId: string = 'general') => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our Message interface
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          user_id: msg.user_id,
          // Set is_assistant to false by default if it doesn't exist in the database
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
