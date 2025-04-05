
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message } from './types';

export const useVoiceChat = () => {
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
          id: Date.now().toString(),
          type: 'assistant',
          text: "Bonjour ! Je suis l'assistant virtuel de chargeurs.ch. Comment puis-je vous aider aujourd'hui ?",
          timestamp: new Date()
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
      setMessages(prev => [...prev, { 
        id: Date.now().toString(),
        type: 'user', 
        text: '🎤 Audio en cours de traitement...',
        timestamp: new Date()
      }]);
      
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { audio: audioBase64 }
      });
      
      if (error) throw error;
      
      // Update the last user message with transcribed text and add assistant response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          id: newMessages[newMessages.length - 1].id,
          type: 'user', 
          text: data.text || 'Audio envoyé',
          timestamp: new Date()
        };
        return [...newMessages, { 
          id: Date.now().toString(),
          type: 'assistant', 
          text: data.text || "Je n'ai pas pu comprendre l'audio, pourriez-vous reformuler ?",
          audio: data.audio,
          timestamp: new Date()
        }];
      });
      
      // Play the audio response
      if (data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'audio:', error);
      toast.error("Une erreur est survenue lors du traitement de l'audio.");
      
      // Update the last message to show error
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'user') {
          newMessages[newMessages.length - 1] = { 
            id: newMessages[newMessages.length - 1].id,
            type: 'user', 
            text: "Audio (erreur de traitement)",
            timestamp: new Date()
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
      setMessages(prev => [...prev, { 
        id: Date.now().toString(),
        type: 'user', 
        text: message,
        timestamp: new Date()
      }]);
      
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { prompt: message }
      });
      
      if (error) throw error;
      
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(),
          type: 'assistant', 
          text: data.text || "Je n'ai pas pu traiter votre demande, pourriez-vous reformuler ?",
          audio: data.audio,
          timestamp: new Date()
        }
      ]);
      
      // Play the audio response
      if (data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur est survenue lors du traitement de votre message.");
      
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(),
          type: 'assistant', 
          text: "Désolé, une erreur est survenue. Veuillez réessayer plus tard.",
          timestamp: new Date()
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

  return {
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
  };
};
