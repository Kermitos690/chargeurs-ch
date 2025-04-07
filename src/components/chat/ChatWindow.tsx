
import React, { useRef, useEffect } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Message } from '@/hooks/useChatMessages';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="px-3 py-2 bg-gray-100 border-b flex items-center">
        <Users className="h-4 w-4 mr-2 text-electric-blue" />
        <span className="font-medium text-sm">Chat Général</span>
      </div>
      <ScrollArea className="flex-grow p-3 bg-gray-50">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-electric-blue/50" />
              <p>Soyez le premier à envoyer un message !</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatWindow;
