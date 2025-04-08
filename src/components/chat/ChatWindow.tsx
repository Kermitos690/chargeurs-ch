
import React, { useRef, useEffect } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Message } from '@/hooks/useChatMessages';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatWindowProps {
  messages: Message[];
  activeUsers: { user_id: string; name?: string; last_active: string }[];
  currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, activeUsers, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Grouper les messages par jour
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    messages.forEach(msg => {
      const messageDate = new Date(msg.created_at).toLocaleDateString('fr-FR');
      
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({ date: messageDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  // Fonction pour obtenir les initiales d'un nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="px-3 py-2 bg-gray-100 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-electric-blue" />
          <span className="font-medium text-sm">Chat Général</span>
        </div>
        
        <div className="flex -space-x-2">
          {activeUsers.slice(0, 3).map((user, i) => (
            <Avatar key={user.user_id} className="h-6 w-6 border-2 border-white">
              <AvatarFallback className="text-xs">
                {getInitials(user.name || 'U')}
              </AvatarFallback>
            </Avatar>
          ))}
          {activeUsers.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-electric-blue text-white flex items-center justify-center text-xs border-2 border-white">
              +{activeUsers.length - 3}
            </div>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-grow p-3 bg-gray-50">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-electric-blue/50" />
              <p>Soyez le premier à envoyer un message !</p>
            </div>
          ) : (
            messageGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <div className="text-center mb-3">
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-600">
                    {group.date === new Date().toLocaleDateString('fr-FR') 
                      ? "Aujourd'hui" 
                      : group.date}
                  </span>
                </div>
                <div className="space-y-3">
                  {group.messages.map((msg) => (
                    <ChatMessage 
                      key={msg.id} 
                      message={msg} 
                      currentUser={currentUser}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatWindow;
