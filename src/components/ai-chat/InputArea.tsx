
import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface InputAreaProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  isRecording: boolean;
  isLoadingSend: boolean;
  handleSendMessage: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  inputMessage,
  setInputMessage,
  isRecording,
  isLoadingSend,
  handleSendMessage,
  startRecording,
  stopRecording,
  handleKeyDown
}) => {
  return (
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
  );
};

export default InputArea;
