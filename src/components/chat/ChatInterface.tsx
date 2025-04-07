
import React, { useState } from 'react';
import { MessageSquare, LogIn } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import { useChatMessages } from '@/hooks/useChatMessages';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useChatMessages();
  const navigate = useNavigate();

  return (
    <>
      <ChatToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-elevation-electric border border-electric-blue/20 flex flex-col h-96">
          <div className="p-3 border-b bg-electric-blue text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">Chat Général Chargeurs.ch</span>
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
          </div>
          
          {user ? (
            <>
              <ChatWindow messages={messages} />
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
