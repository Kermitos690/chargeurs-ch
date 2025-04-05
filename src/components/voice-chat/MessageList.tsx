
import React from 'react';
import { Button } from '@/components/ui/button';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  audioRef: React.RefObject<HTMLAudioElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, audioRef, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 max-h-[calc(70vh-180px)]">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] p-3 rounded-xl ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                : 'bg-muted rounded-tl-none'
            }`}
          >
            <p>{message.text}</p>
            {message.audio && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-6 text-xs"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.src = message.audio || '';
                    audioRef.current.play().catch(err => console.error("Playback error:", err));
                  }
                }}
              >
                Réécouter
              </Button>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
