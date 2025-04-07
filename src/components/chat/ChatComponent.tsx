
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Send, User, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import MessageList from './MessageList';
import { Message } from '@/types/chat';
import { fetchMessages, sendMessage, setupChatTables, subscribeToMessages } from '@/services/supabase/chat';

const ChatComponent = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Configure les tables de chat si nécessaire
  useEffect(() => {
    const setup = async () => {
      await setupChatTables();
    };
    setup();
  }, []);

  // Récupère les messages initiaux
  useEffect(() => {
    const getInitialMessages = async () => {
      try {
        setLoading(true);
        const messagesData = await fetchMessages('general');
        if (messagesData) {
          setMessages(messagesData);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Erreur lors du chargement des messages');
      } finally {
        setLoading(false);
      }
    };

    getInitialMessages();
  }, []);

  // S'abonne aux nouveaux messages
  useEffect(() => {
    // Utilisez la fonction subscribeToMessages pour recevoir les nouveaux messages
    const unsubscribe = subscribeToMessages('general', (newMessage) => {
      setMessages((previous) => [...previous, newMessage]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Défile vers le bas quand les messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Vous devez être connecté pour envoyer des messages');
      return;
    }

    if (!newMessage.trim()) return;
    
    setSending(true);
    
    try {
      const result = await sendMessage(
        newMessage.trim(), 
        user.uid, 
        user.displayName || 'Utilisateur'
      );
      
      if (!result) {
        toast.error('Erreur lors de l\'envoi du message');
        return;
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center p-8">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">Connexion requise</h3>
          <p className="mt-2 text-sm text-gray-500">
            Veuillez vous connecter pour accéder au chat
          </p>
          <Button className="mt-4" asChild>
            <a href="/auth/login">Se connecter</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center">
        <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
        <div>
          <h2 className="text-lg font-medium">Chat général</h2>
          <p className="text-sm text-gray-500">
            {messages.length} messages
          </p>
        </div>
      </div>

      <div className="h-[500px] flex flex-col">
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-500">Chargement des messages...</span>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4">
            <MessageList messages={messages} currentUserId={user?.uid} />
            <div ref={messagesEndRef} />
          </div>
        )}

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              disabled={sending}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              disabled={sending || !newMessage.trim()}
              className="shrink-0"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
