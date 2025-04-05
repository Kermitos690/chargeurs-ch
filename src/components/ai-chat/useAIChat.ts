
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Message } from './types';

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoadingSend(true);
    
    try {
      // Call AI processing API
      const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
        body: { prompt: userMessage }
      });
      
      if (error) throw error;
      
      // Add response
      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        audio: data.audio
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      
      // Play audio if enabled
      if (isAudioEnabled && data.audio && audioRef.current) {
        audioRef.current.src = data.audio;
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("An error occurred while communicating with the AI");
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
      toast.info("Recording...");
    } catch (error) {
      console.error('Microphone access error:', error);
      toast.error("Unable to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing your voice question...");
      
      // Stop audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleAudioSubmit = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
    // Convert audio to base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      
      setIsLoadingSend(true);
      
      // Add temporary user message
      const tempUserMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: "Processing voice recording...",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, tempUserMessage]);
      
      try {
        // Send audio for processing
        const { data, error } = await supabase.functions.invoke('ai-voice-chat', {
          body: { audio: base64Audio }
        });
        
        if (error) throw error;
        
        // Update user message with transcription
        setMessages(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === 'user') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: data.text || "Audio sent"
            };
          }
          
          // Add assistant response
          const newAssistantMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.text,
            timestamp: new Date(),
            audio: data.audio
          };
          
          return [...updated, newAssistantMessage];
        });
        
        // Play audio if enabled
        if (isAudioEnabled && data.audio && audioRef.current) {
          audioRef.current.src = data.audio;
          audioRef.current.play().catch(err => console.error("Audio playback error:", err));
        }
      } catch (error) {
        console.error('Error processing audio:', error);
        toast.error("An error occurred while processing your voice message");
        
        setMessages(prev => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === 'user') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: "Voice message (processing error)"
            };
          }
          return updated;
        });
      } finally {
        setIsLoadingSend(false);
      }
    };
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    toast.info(isAudioEnabled ? "Audio disabled" : "Audio enabled");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
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
  };
};
