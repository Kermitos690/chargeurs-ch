
import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useVoiceChat } from './useVoiceChat';
import MessageList from './MessageList';
import InputArea from './InputArea';
import DrawerHeader from './DrawerHeader';

const VoiceChat: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    isRecording,
    isLoading,
    userInput,
    setUserInput,
    drawerMinimized,
    setDrawerMinimized,
    audioRef,
    messagesEndRef,
    startRecording,
    stopRecording,
    sendTextMessage,
    handleKeyDown
  } = useVoiceChat();

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      
      <Drawer 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          setDrawerMinimized(false);
        }}
      >
        <DrawerTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90 text-white"
            size="icon"
          >
            <Mic className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className={`max-w-md mx-auto p-0 ${drawerMinimized ? 'h-auto' : 'h-[70vh]'}`}>
          <DrawerHeader 
            drawerMinimized={drawerMinimized}
            setDrawerMinimized={setDrawerMinimized}
            setIsOpen={setIsOpen}
          />

          {!drawerMinimized && (
            <>
              <MessageList 
                messages={messages} 
                audioRef={audioRef} 
                messagesEndRef={messagesEndRef}
              />

              <InputArea
                userInput={userInput}
                setUserInput={setUserInput}
                isRecording={isRecording}
                isLoading={isLoading}
                startRecording={startRecording}
                stopRecording={stopRecording}
                sendTextMessage={sendTextMessage}
                handleKeyDown={handleKeyDown}
              />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default VoiceChat;
