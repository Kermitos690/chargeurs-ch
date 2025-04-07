
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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

  // Fetch messages on mount
  useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user?.id]);

  // Fetch messages from the database
  const fetchMessages = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our Message interface
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          user_id: msg.user_id,
          is_assistant: Boolean(msg.is_assistant),
          created_at: msg.created_at,
          room_id: msg.room_id
        }));
        
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    }
  };

  // Send a new message
  const sendMessage = async (content: string) => {
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
        
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Simulate a response from the chatbot
      setTimeout(async () => {
        const responses = [
          "Bonjour! Comment puis-je vous aider avec vos questions sur la recharge électrique?",
          "Nos chargeurs sont compatibles avec la plupart des véhicules électriques sur le marché.",
          "Pour une installation résidentielle, nous recommandons nos bornes de 11kW ou 22kW selon votre installation électrique.",
          "Avez-vous besoin d'aide pour choisir un produit spécifique?",
          "N'hésitez pas à consulter notre FAQ pour plus d'informations techniques.",
          "Notre équipe de support est disponible du lundi au vendredi de 9h à 18h."
        ];
        
        const assistantResponse = {
          content: responses[Math.floor(Math.random() * responses.length)],
          user_id: user.id,
          is_assistant: true,
          room_id: 'general'
        };
        
        const { data: botResponse, error: botError } = await supabase
          .from('messages')
          .insert(assistantResponse)
          .select();
        
        if (botError) throw botError;
        
        if (botResponse && botResponse[0]) {
          const newBotMessage: Message = {
            id: botResponse[0].id,
            content: botResponse[0].content,
            user_id: botResponse[0].user_id,
            is_assistant: true,
            created_at: botResponse[0].created_at,
            room_id: botResponse[0].room_id
          };
          
          setMessages(prev => [...prev, newBotMessage]);
        }
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Erreur lors de l'envoi du message");
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    fetchMessages
  };
};
