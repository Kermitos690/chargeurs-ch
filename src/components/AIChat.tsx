
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audio?: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: "Bonjour ! Je suis l'assistant IA de chargeurs.ch. Comment puis-je vous aider avec vos questions sur les bornes de recharge ou les véhicules électriques ?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Ajouter le message de l'utilisateur
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoadingSend(true);
    
    try {
      // Appeler l'API de traitement d'IA
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { prompt: userMessage }
      });
      
      if (error) throw error;
      
      // Ajouter la réponse
      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        audio: data.audio
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      
      // Jouer l'audio si activé
      if (isAudioEnabled && data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play().catch(err => console.error("Erreur de lecture audio:", err));
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur est survenue lors de la communication avec l'IA");
    } finally {
      setIsLoadingSend(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorderRef.current.addEventListener('stop', async () => {
        if (audioChunksRef.current.length > 0) {
          handleAudioSubmit();
        }
      });
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.info("Enregistrement en cours...");
    } catch (error) {
      console.error('Erreur d\'accès au microphone:', error);
      toast.error("Impossible d'accéder au microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Traitement de votre question vocale...");
      
      // Arrêter les tracks audio
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleAudioSubmit = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
    // Convertir l'audio en base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      
      setIsLoadingSend(true);
      
      // Ajouter un message temporaire de l'utilisateur
      const tempUserMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: "Enregistrement vocal en cours de traitement...",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, tempUserMessage]);
      
      try {
        // Envoyer l'audio pour traitement
        const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
          body: { audio: base64Audio }
        });
        
        if (error) throw error;
        
        // Mettre à jour le message de l'utilisateur avec la transcription
        setMessages(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === 'user') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: data.text || "Audio envoyé"
            };
          }
          
          // Ajouter la réponse de l'assistant
          const newAssistantMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.text,
            timestamp: new Date(),
            audio: data.audio
          };
          
          return [...updated, newAssistantMessage];
        });
        
        // Jouer l'audio si activé
        if (isAudioEnabled && data.audio && audioRef.current) {
          audioRef.current.src = data.audio;
          audioRef.current.play().catch(err => console.error("Erreur de lecture audio:", err));
        }
      } catch (error) {
        console.error('Erreur lors du traitement de l\'audio:', error);
        toast.error("Une erreur est survenue lors du traitement de votre message vocal");
        
        setMessages(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === 'user') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: "Message vocal (erreur de traitement)"
            };
          }
          return updated;
        });
      } finally {
        setIsLoadingSend(false);
      }
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    toast.info(isAudioEnabled ? "Audio désactivé" : "Audio activé");
  };

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
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                Assistant IA chargeurs.ch
              </DialogTitle>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAudio}
                  className="h-8 w-8"
                >
                  {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.audio && message.role === 'assistant' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 h-6 text-xs"
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.src = message.audio || '';
                          audioRef.current.play().catch(err => console.error("Erreur de lecture:", err));
                        }
                      }}
                    >
                      Réécouter
                    </Button>
                  )}
                  <div className="text-xs opacity-50 mt-1">
                    {new Intl.DateTimeFormat('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(message.timestamp)}
                  </div>
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
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoadingSend}
                className="flex-shrink-0"
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message..."
                className="flex-1 resize-none min-h-[40px] max-h-[120px]"
                disabled={isRecording || isLoadingSend}
                rows={1}
                style={{
                  height: Math.min(Math.max(inputMessage.split('\n').length, 1) * 24, 120) + 'px'
                }}
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRecording || isLoadingSend}
                size="icon"
                className="flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoadingSend && (
              <div className="text-center mt-2 text-sm text-muted-foreground">
                Traitement en cours...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChat;
