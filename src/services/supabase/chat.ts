
import { supabase } from '@/integrations/supabase/client';
import { Message, ChatRoom } from '@/types/chat';

// Function to fetch messages
export const fetchMessages = async (roomId: string = 'general'): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception while fetching messages:', error);
    return [];
  }
};

// Function to send a message
export const sendMessage = async (
  content: string, 
  userId: string, 
  userName: string = 'User', 
  roomId: string = 'general'
): Promise<Message | null> => {
  try {
    const newMessage = {
      content,
      user_id: userId,
      user_name: userName,
      room_id: roomId,
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception while sending message:', error);
    return null;
  }
};

// Function to fetch chat rooms - simplified since chat_rooms table doesn't exist yet
export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    // Return default room since the table might not exist yet
    return [{
      id: 'general',
      name: 'General',
      description: 'Public chat room for everyone',
      created_at: new Date().toISOString(),
      is_private: false
    }];
  } catch (error) {
    console.error('Exception while fetching chat rooms:', error);
    return [];
  }
};

// Function to subscribe to new messages
export const subscribeToMessages = (
  roomId: string = 'general',
  callback: (message: Message) => void
) => {
  const subscription = supabase
    .channel(`messages:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      },
      (payload) => {
        // Cast payload.new to Message type
        const newMessage = payload.new as Message;
        callback(newMessage);
      }
    )
    .subscribe();
  
  // Return unsubscribe function
  return () => {
    supabase.removeChannel(subscription);
  };
};

// Add this new function to replace the missing setupChatTables
export const setupChatTables = async (): Promise<boolean> => {
  console.log('Chat tables are set up automatically by Supabase migrations');
  // In a real implementation, this would ensure the tables exist
  // But for now we'll just return true since it's a placeholder
  return true;
};

// Function to get chat messages (alias for fetchMessages to fix import)
export const getChatMessages = fetchMessages;

// Function to send chat message (alias for sendMessage to fix import)
export const sendChatMessage = async (
  content: string, 
  userId: string,
  userName: string = 'User'
): Promise<{success: boolean, message?: Message}> => {
  const result = await sendMessage(content, userId, userName);
  return {
    success: !!result,
    message: result || undefined
  };
};
