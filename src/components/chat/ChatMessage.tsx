
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    content: string;
    is_assistant: boolean;
  };
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%]",
        isUser 
          ? "bg-electric-blue text-white rounded-tr-none" 
          : "bg-gray-200 text-gray-800 rounded-tl-none"
      )}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
