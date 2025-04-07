
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChatMessages';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isCurrentUser = user?.id === message.user_id;
  
  return (
    <div className={cn(
      "flex flex-col",
      isCurrentUser ? "items-end" : "items-start"
    )}>
      <span className="text-xs text-gray-500 mb-1">
        {isCurrentUser ? 'Vous' : 'Utilisateur'}
      </span>
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%]",
        isCurrentUser 
          ? "bg-electric-blue text-white rounded-tr-none" 
          : "bg-gray-200 text-gray-800 rounded-tl-none"
      )}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
