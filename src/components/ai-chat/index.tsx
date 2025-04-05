
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAIChat } from './useAIChat';
import MessageList from './MessageList';
import InputArea from './InputArea';
import DialogHeader from './DialogHeader';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    inputMessage,
    setInputMessage,
    isRecording,
    isLoadingSend,
    isAudioEnabled,
    audioRef,
    handleSendMessage,
    startRecording,
    stopRecording,
    toggleAudio,
    handleKeyDown
  } = useAIChat();

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: "Bonjour ! Je suis l'assistant IA de chargeurs.ch. Comment puis-je vous aider avec vos questions sur les bornes de recharge ou les véhicules électriques ?",
        timestamp: new Date()
      };
      // We're setting this directly because it's just the initial setup
      // eslint-disable-next-line react-hooks/exhaustive-deps
      messages.push(initialMessage);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-24 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-primary text-white hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="w-full max-w-md h-[80vh] md:h-[70vh] flex flex-col p-0">
          <DialogHeader 
            isAudioEnabled={isAudioEnabled} 
            toggleAudio={toggleAudio} 
            onClose={() => setIsOpen(false)}
          />
          
          <MessageList messages={messages} audioRef={audioRef} />
          
          <InputArea
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            isRecording={isRecording}
            isLoadingSend={isLoadingSend}
            handleSendMessage={handleSendMessage}
            startRecording={startRecording}
            stopRecording={stopRecording}
            handleKeyDown={handleKeyDown}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChat;
