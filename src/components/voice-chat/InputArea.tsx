
import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isRecording: boolean;
  isLoading: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  sendTextMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  userInput,
  setUserInput,
  isRecording,
  isLoading,
  startRecording,
  stopRecording,
  sendTextMessage,
  handleKeyDown
}) => {
  return (
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
  );
};

export default InputArea;
