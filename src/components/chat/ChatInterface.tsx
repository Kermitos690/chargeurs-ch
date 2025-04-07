
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MessageSquare, Send } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import ChatToggle from './ChatToggle';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  is_assistant: boolean;
  created_at: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Charger les messages de l'utilisateur courant
  useEffect(() => {
    if (user?.id && isOpen) {
      fetchMessages();
    }
  }, [user?.id, isOpen]);

  // Auto-scroll à chaque nouveau message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !user?.id) return;
    
    const userMessage = {
      content: input,
      sender_id: user.id,
      is_assistant: false,
      user_id: user.id
    };
    
    try {
      setLoading(true);
      
      // Enregistrer le message de l'utilisateur
      const { data: messageSent, error: messageError } = await supabase
        .from('chat_messages')
        .insert(userMessage)
        .select();
      
      if (messageError) throw messageError;
      
      // Mettre à jour l'interface
      if (messageSent && messageSent[0]) {
        setMessages(prev => [...prev, messageSent[0] as Message]);
      }
      
      setInput('');
      
      // Simuler une réponse du chatbot (en attendant une intégration IA future)
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
          sender_id: 'assistant',
          is_assistant: true,
          user_id: user.id
        };
        
        const { data: botResponse, error: botError } = await supabase
          .from('chat_messages')
          .insert(assistantResponse)
          .select();
        
        if (botError) throw botError;
        
        if (botResponse && botResponse[0]) {
          setMessages(prev => [...prev, botResponse[0] as Message]);
        }
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Erreur lors de l'envoi du message");
      setLoading(false);
    }
  };

  return (
    <>
      <ChatToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-elevation-electric border border-electric-blue/20 flex flex-col h-96">
          <div className="p-3 border-b bg-electric-blue text-white rounded-t-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span className="font-medium">Assistance Chargeurs.ch</span>
          </div>
          
          <ScrollArea className="flex-grow p-3 bg-gray-50">
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-electric-blue/50" />
                  <p>Posez une question à notre assistant</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <ChatMessage 
                    key={msg.id} 
                    message={msg} 
                    isUser={!msg.is_assistant} 
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-grow mr-2"
              disabled={loading || !user}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-electric-blue hover:bg-electric-blue/90"
              disabled={loading || !input.trim() || !user}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatInterface;
