
import React, { useState } from 'react';
import { MessageSquare } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import { useChatMessages } from '@/hooks/useChatMessages';

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useChatMessages();

  return (
    <>
      <ChatToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-elevation-electric border border-electric-blue/20 flex flex-col h-96">
          <div className="p-3 border-b bg-electric-blue text-white rounded-t-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span className="font-medium">Assistance Chargeurs.ch</span>
          </div>
          
          <ChatWindow messages={messages} />
          
          <ChatInput 
            onSendMessage={sendMessage} 
            loading={loading} 
            isUserLoggedIn={!!user} 
          />
        </div>
      )}
    </>
  );
};

export default ChatInterface;
