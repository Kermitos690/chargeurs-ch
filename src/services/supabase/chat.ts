
import { supabase } from '@/integrations/supabase/client';
import { Message, ChatRoom } from '@/types/chat';

/**
 * Récupère les messages d'une salle de chat
 * @param roomId ID de la salle de chat
 * @returns Messages ou null en cas d'erreur
 */
export const getChatMessages = async (roomId: string): Promise<Message[] | null> => {
  try {
    const { data, error } = await supabase
      .from('messages' as any)
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true }) as { data: Message[] | null, error: any };

    if (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return null;
  }
};

/**
 * Envoie un message dans une salle de chat
 * @param message Contenu du message
 * @param userId ID de l'utilisateur
 * @param roomId ID de la salle de chat
 * @returns Résultat de l'opération
 */
export const sendChatMessage = async (
  content: string,
  userId: string,
  roomId: string = 'general'
): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('messages' as any)
      .insert({
        content,
        user_id: userId,
        room_id: roomId
      }) as { error: any };

    if (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return { success: false, error };
  }
};

/**
 * Récupère les salles de chat disponibles
 * @returns Salles de chat ou null en cas d'erreur
 */
export const getChatRooms = async (): Promise<ChatRoom[] | null> => {
  try {
    const { data, error } = await supabase
      .from('chat_rooms' as any)
      .select('*')
      .order('name', { ascending: true }) as { data: ChatRoom[] | null, error: any };

    if (error) {
      console.error('Erreur lors de la récupération des salles de chat:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des salles de chat:', error);
    return null;
  }
};

/**
 * Configure la table des messages pour le chat en temps réel
 */
export const setupChatTables = async (): Promise<{ success: boolean; error?: any }> => {
  try {
    // Vérifie si les tables existent déjà
    const { data: tables, error: checkError } = await supabase
      .from('information_schema.tables' as any)
      .select('table_name')
      .in('table_name', ['messages', 'chat_rooms'])
      .eq('table_schema', 'public');

    if (checkError) {
      console.error('Erreur lors de la vérification des tables de chat:', checkError);
      return { success: false, error: checkError };
    }

    const existingTables = tables ? tables.map((t: any) => t.table_name) : [];
    
    // Si les tables n'existent pas, les créer
    if (!existingTables.includes('messages') || !existingTables.includes('chat_rooms')) {
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql_query: `
          -- Crée la table des salles de chat si elle n'existe pas
          CREATE TABLE IF NOT EXISTS public.chat_rooms (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            description TEXT,
            is_private BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
          );

          -- Crée la table des messages si elle n'existe pas
          CREATE TABLE IF NOT EXISTS public.messages (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            content TEXT NOT NULL,
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            room_id TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );

          -- Active les mises à jour en temps réel pour les tables
          ALTER TABLE public.messages REPLICA IDENTITY FULL;
          ALTER TABLE public.chat_rooms REPLICA IDENTITY FULL;
          
          -- Ajoute les tables à la publication supabase_realtime
          ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
          ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
          
          -- Ajoute une salle de chat générale si elle n'existe pas déjà
          INSERT INTO public.chat_rooms (id, name, description, is_private)
          VALUES ('general', 'Général', 'Salle de discussion générale', false)
          ON CONFLICT (id) DO NOTHING;
          
          -- Active RLS sur les tables
          ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
          ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
          
          -- Politiques RLS pour les messages
          CREATE POLICY "Users can read all messages" ON public.messages
            FOR SELECT USING (true);
            
          CREATE POLICY "Authenticated users can insert messages" ON public.messages
            FOR INSERT WITH CHECK (auth.role() = 'authenticated');
          
          -- Politiques RLS pour les salles de chat
          CREATE POLICY "Users can read all chat rooms" ON public.chat_rooms
            FOR SELECT USING (true);
        `
      } as any);

      if (createError) {
        console.error('Erreur lors de la création des tables de chat:', createError);
        return { success: false, error: createError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la configuration des tables de chat:', error);
    return { success: false, error };
  }
};
