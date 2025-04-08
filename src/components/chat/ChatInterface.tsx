
import React, { useState, useEffect } from 'react';
import { MessageSquare, LogIn, Users } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import { useChatMessages } from '@/hooks/useChatMessages';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { messages, loading, sendMessage, unreadCount, markAllAsRead, activeUsers } = useChatMessages();
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);

  // Gérer les messages non lus lorsque le chat est fermé
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Si le dernier message n'est pas de l'utilisateur courant
      if (lastMessage.user_id !== user?.id) {
        setHasUnread(true);
      }
    } else {
      setHasUnread(false);
    }
  }, [messages, isOpen, user]);

  return (
    <>
      <ChatToggle 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        hasUnread={hasUnread}
      />
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-elevation-electric border border-electric-blue/20 flex flex-col h-96">
          <div className="p-3 border-b bg-electric-blue text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">Chat Général Chargeurs.ch</span>
              <Badge variant="secondary" className="ml-2 text-xs bg-white/20">
                {activeUsers.length} en ligne
              </Badge>
            </div>
            {!user && (
              <Button 
                size="sm" 
                variant="secondary"
                className="text-xs"
                onClick={() => navigate('/auth/login')}
              >
                <LogIn className="h-3.5 w-3.5 mr-1" />
                Connexion
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="ml-2 text-white hover:bg-white/20 p-1 h-7 w-7"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Fermer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fermer le chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {user ? (
            <>
              <ChatWindow messages={messages} activeUsers={activeUsers} currentUser={user} />
              <ChatInput 
                onSendMessage={sendMessage} 
                loading={loading} 
                isUserLoggedIn={!!user} 
              />
            </>
          ) : (
            <div className="flex items-center justify-center flex-grow p-6 text-center">
              <div>
                <LogIn className="h-12 w-12 mx-auto mb-4 text-electric-blue/50" />
                <h3 className="text-lg font-semibold mb-2">Accès réservé</h3>
                <p className="text-gray-500 mb-4">
                  Connectez-vous pour rejoindre la conversation avec les autres utilisateurs.
                </p>
                <Button 
                  onClick={() => navigate('/auth/login')}
                  className="bg-electric-blue hover:bg-electric-blue/90"
                >
                  Se connecter
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatInterface;
