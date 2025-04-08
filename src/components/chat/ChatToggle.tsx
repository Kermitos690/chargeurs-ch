
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasUnread?: boolean;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, setIsOpen, hasUnread = false }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        className={`rounded-full h-12 w-12 shadow-elevation-electric relative ${
          isOpen ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-electric-blue hover:bg-electric-blue/90'
        }`}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
            >
              !
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
};

export default ChatToggle;
