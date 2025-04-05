
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, ChevronUp, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  type: 'user' | 'assistant';
  text: string;
  audio?: string;
}

const VoiceChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [drawerMinimized, setDrawerMinimized] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'assistant',
          text: "Bonjour ! Je suis l'assistant virtuel de chargeurs.ch. Comment puis-je vous aider aujourd'hui ?"
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorderRef.current.addEventListener('stop', async () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          audioChunksRef.current = [];
          
          // Convert to base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            await sendAudioToOpenAI(base64data);
          };
        }
      });
      
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors de l\'accès au micro:', error);
      toast.error("Impossible d'accéder au microphone. Veuillez vérifier que vous avez donné les permissions nécessaires.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const sendAudioToOpenAI = async (audioBase64: string) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', text: '🎤 Audio en cours de traitement...' }]);
      
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { audio: audioBase64 }
      });
      
      if (error) throw error;
      
      // Update the last user message with transcribed text and add assistant response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { type: 'user', text: data.text || 'Audio envoyé' };
        return [...newMessages, { 
          type: 'assistant', 
          text: data.text || "Je n'ai pas pu comprendre l'audio, pourriez-vous reformuler ?",
          audio: data.audio 
        }];
      });
      
      // Play the audio response
      if (data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'audio:', error);
      toast.error("Une erreur est survenue lors du traitement de l'audio.");
      
      // Update the last message to show error
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'user') {
          newMessages[newMessages.length - 1] = { 
            type: 'user', 
            text: "Audio (erreur de traitement)" 
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = async () => {
    if (!userInput.trim()) return;
    
    const message = userInput.trim();
    setUserInput('');
    
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', text: message }]);
      
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { prompt: message }
      });
      
      if (error) throw error;
      
      setMessages(prev => [
        ...prev, 
        { 
          type: 'assistant', 
          text: data.text || "Je n'ai pas pu traiter votre demande, pourriez-vous reformuler ?",
          audio: data.audio 
        }
      ]);
      
      // Play the audio response
      if (data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur est survenue lors du traitement de votre message.");
      
      setMessages(prev => [
        ...prev, 
        { 
          type: 'assistant', 
          text: "Désolé, une erreur est survenue. Veuillez réessayer plus tard."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press in input field
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  // Update config.toml to add the new edge function
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
          <DrawerHeader className="p-4 flex justify-between items-center border-b">
            <DrawerTitle className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              Assistant chargeurs.ch
            </DrawerTitle>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setDrawerMinimized(!drawerMinimized);
                }}
                className="h-8 w-8"
              >
                {drawerMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>

          {!drawerMinimized && (
            <>
              <div className="flex-1 overflow-auto p-4 space-y-4 max-h-[calc(70vh-180px)]">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-xl ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.audio && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 h-6 text-xs"
                          onClick={() => {
                            if (audioRef.current) {
                              audioRef.current.src = message.audio || '';
                              audioRef.current.play();
                            }
                          }}
                        >
                          Réécouter
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    disabled={isLoading}
                    onClick={isRecording ? stopRecording : startRecording}
                    className="flex-shrink-0"
                  >
                    {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <div className="relative flex-1">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Écrivez votre message..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-10 min-h-10 max-h-32 flex items-center"
                      disabled={isLoading || isRecording}
                      rows={1}
                      style={{ 
                        overflow: 'auto',
                        height: Math.min(Math.max(userInput.split('\n').length, 1) * 24, 80) + 'px'
                      }}
                    />
                  </div>
                  
                  <Button
                    disabled={isLoading || isRecording || !userInput.trim()}
                    onClick={sendTextMessage}
                    size="icon"
                    className="flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {isLoading && (
                  <div className="text-center mt-2 text-sm text-muted-foreground">
                    Traitement en cours...
                  </div>
                )}
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default VoiceChat;
