
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
      
      // Fetch the user's profile to get their name
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();
      
      const userName = profileError ? (user.email?.split('@')[0] || 'Utilisateur') : 
                      (profileData?.name || user.email?.split('@')[0] || 'Utilisateur');
      
      // Optimistic update - add message to UI immediately
      const optimisticId = crypto.randomUUID();
      const optimisticMessage: Message = {
        id: optimisticId,
        content: content,
        user_id: user.id,
        is_assistant: false,
        created_at: new Date().toISOString(),
        room_id: 'general',
        user_name: userName
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      
      // Send user message to database
      const { data: messageSent, error: messageError } = await supabase
        .from('messages')
        .insert(userMessage)
        .select('*');
      
      if (messageError) {
        // Remove optimistic message on error
        setMessages(prev => prev.filter(msg => msg.id !== optimisticId));
        toast.error(`Erreur: ${messageError.message}`);
        throw messageError;
      }
      
      if (messageSent && messageSent[0]) {
        // Replace optimistic message with actual message from server
        setMessages(prev => 
          prev.map(msg => 
            msg.id === optimisticId 
              ? {
                  id: messageSent[0].id,
                  content: messageSent[0].content,
                  user_id: messageSent[0].user_id,
                  is_assistant: false,
                  created_at: messageSent[0].created_at,
                  room_id: messageSent[0].room_id,
                  user_name: userName
                }
              : msg
          )
        );
        
        toast.success('Message envoyé');
      }
      
      setLoading(false);
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error(`Erreur d'envoi: ${error.message || 'Erreur inconnue'}`);
      setLoading(false);
    }
  }, [user, setMessages, setLoading]);

  return { sendMessage };
};
