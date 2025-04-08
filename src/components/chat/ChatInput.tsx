
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image, Smile, Paperclip, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  isUserLoggedIn: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading, isUserLoggedIn }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Envoyer le message avec Entrée, mais autoriser Shift+Entrée pour un saut de ligne
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Gérer le focus lors de l'expansion
  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  // Ajuster automatiquement la hauteur du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <form onSubmit={handleSendMessage} className="p-3 border-t">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 40 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 40 }}
            className="relative"
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tapez votre message..."
              className="resize-none min-h-[60px] pr-12 py-2"
              disabled={loading || !isUserLoggedIn}
            />
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4 text-gray-400" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                className="bg-electric-blue hover:bg-electric-blue/90 h-8 w-8"
                disabled={loading || !input.trim() || !isUserLoggedIn}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Tapez votre message..."
              className="flex-grow"
              disabled={loading || !isUserLoggedIn}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-electric-blue hover:bg-electric-blue/90"
              disabled={loading || !input.trim() || !isUserLoggedIn}
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ChatInput;
