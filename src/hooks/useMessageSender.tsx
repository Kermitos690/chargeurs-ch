
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message } from './useChatMessages';
import { User } from '@supabase/supabase-js';

export const useMessageSender = (
  user: User | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !user?.id) return;
    
    const userMessage = {
      content: content,
      user_id: user.id,
      is_assistant: false,
      room_id: 'general'
    };
    
    try {
      setLoading(true);
      
      // Send user message
      const { data: messageSent, error: messageError } = await supabase
        .from('messages')
        .insert(userMessage)
        .select();
      
      if (messageError) throw messageError;
      
      if (messageSent && messageSent[0]) {
        const newMessage: Message = {
          id: messageSent[0].id,
          content: messageSent[0].content,
          user_id: messageSent[0].user_id,
          is_assistant: false,
          created_at: messageSent[0].created_at,
          room_id: messageSent[0].room_id
        };
        
        // Ajoutons le message à l'état local
        setMessages(prev => [...prev, newMessage]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Erreur lors de l'envoi du message");
      setLoading(false);
    }
  }, [user, setMessages, setLoading]);

  return { sendMessage };
};
