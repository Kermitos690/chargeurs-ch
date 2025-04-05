
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun message pour le moment. Soyez le premier à écrire !
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.user_id === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                message.user_id === currentUserId 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-sm break-words">
                {message.content}
              </div>
              <div 
                className={`text-xs mt-1 ${
                  message.user_id === currentUserId 
                    ? 'text-blue-100' 
                    : 'text-gray-500'
                }`}
              >
                {message.created_at 
                  ? formatDistanceToNow(new Date(message.created_at), { 
                      addSuffix: true, 
                      locale: fr 
                    }) 
                  : ''}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
