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

// Function to fetch chat rooms
export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    // Assuming there's a chat_rooms table
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching chat rooms:', error);
      return [];
    }
    
    return data || [];
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

// Execute custom SQL is not directly supported in the client
// If you need custom SQL, you should create a PostgreSQL function
// and call it using RPC
export const executeCustomQuery = async () => {
  try {
    // Replace this with the appropriate function call
    // Instead of using exec_sql which doesn't exist
    const { data, error } = await supabase.rpc('has_role', { 
      _user_id: '00000000-0000-0000-0000-000000000000',
      _role: 'admin'
    });
    
    if (error) {
      console.error('Error executing custom query:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception while executing custom query:', error);
    return null;
  }
};
