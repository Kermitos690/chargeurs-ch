
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ChatToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <Button
      className={`fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-elevation-electric ${
        isOpen ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-electric-blue hover:bg-electric-blue/90'
      }`}
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
    </Button>
  );
};

export default ChatToggle;
