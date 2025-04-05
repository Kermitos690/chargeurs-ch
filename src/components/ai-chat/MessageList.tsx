
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, audioRef }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-muted rounded-bl-none'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.audio && message.role === 'assistant' && (
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
            <div className="text-xs opacity-50 mt-1">
              {new Intl.DateTimeFormat('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              }).format(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
