
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from './useChatMessages';
import { toast } from 'sonner';

export const useMessagesFetcher = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const fetchMessages = useCallback(async (roomId: string = 'general') => {
    try {
      // Afficher un toast de chargement
      const loadingToast = toast.loading('Chargement des messages...');
      
      const { data, error } = await supabase
        .from('messages')
        .select('*, profiles(name, email)') // Joindre les informations de profil
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      // Fermer le toast de chargement
      toast.dismiss(loadingToast);
      
      if (error) {
        toast.error(`Erreur: ${error.message}`);
        throw error;
      }
      
      if (data) {
        // Transform the data to match our Message interface
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          user_id: msg.user_id,
          is_assistant: Boolean(msg.is_assistant),
          created_at: msg.created_at,
          room_id: msg.room_id,
          // Ajouter le nom de l'utilisateur s'il existe
          user_name: msg.profiles?.name || 'Utilisateur'
        }));
        
        setMessages(formattedMessages);
        toast.success('Messages chargés avec succès');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      toast.error('Impossible de charger les messages');
    }
  }, [setMessages]);

  return { fetchMessages };
};
