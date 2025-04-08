
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChatMessages';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle2, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isCurrentUser = currentUser?.id === message.user_id;
  
  // Formater le temps relatif
  const timeAgo = formatDistanceToNow(new Date(message.created_at), { 
    addSuffix: true,
    locale: fr 
  });
  
  // Obtenir le nom d'affichage
  const displayName = isCurrentUser 
    ? 'Vous' 
    : message.user_name || 'Utilisateur';
  
  // Obtenir les initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className={cn(
      "flex",
      isCurrentUser ? "justify-end" : "justify-start",
      "mb-4"
    )}>
      {!isCurrentUser && (
        <div className="mr-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[75%]",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <div className="flex items-center mb-1">
          <span className="text-xs text-gray-500 font-medium">
            {displayName}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-gray-400 ml-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(message.created_at).toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{timeAgo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className={cn(
          "rounded-lg px-3 py-2",
          isCurrentUser 
            ? "bg-electric-blue text-white rounded-tr-none" 
            : "bg-gray-200 text-gray-800 rounded-tl-none",
          "shadow-sm"
        )}>
          {message.content}
        </div>
        
        {isCurrentUser && (
          <div className="flex items-center mt-1 text-xs text-gray-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            <span>Envoyé</span>
          </div>
        )}
      </div>
      
      {isCurrentUser && (
        <div className="ml-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-electric-blue text-white">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
