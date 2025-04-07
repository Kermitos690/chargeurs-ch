
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  isUserLoggedIn: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading, isUserLoggedIn }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tapez votre message..."
        className="flex-grow mr-2"
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
    </form>
  );
};

export default ChatInput;
