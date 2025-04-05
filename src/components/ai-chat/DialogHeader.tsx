
import React from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogHeader as UIDialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DialogHeaderProps {
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  onClose: () => void;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  isAudioEnabled,
  toggleAudio,
  onClose
}) => {
  return (
    <UIDialogHeader className="px-4 py-2 border-b">
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
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </UIDialogHeader>
  );
};

export default DialogHeader;
