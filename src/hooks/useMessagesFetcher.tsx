
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
      
      // Fetch messages without join to profiles
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      // Fermer le toast de chargement
      toast.dismiss(loadingToast);
      
      if (error) {
        toast.error(`Erreur: ${error.message}`);
        throw error;
      }
      
      if (data) {
        // Now separately fetch profiles for user_ids
        const userIds = [...new Set(data.map(msg => msg.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', userIds);
          
        // Create a map of user_id to name
        const userNamesMap = new Map();
        if (profilesData && !profilesError) {
          profilesData.forEach(profile => {
            userNamesMap.set(profile.id, profile.name);
          });
        }
        
        // Transform the data to match our Message interface
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          user_id: msg.user_id,
          is_assistant: Boolean(msg.is_assistant),
          created_at: msg.created_at,
          room_id: msg.room_id,
          // Get user name from the map, or fallback to email or 'Utilisateur'
          user_name: userNamesMap.get(msg.user_id) || 'Utilisateur'
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
