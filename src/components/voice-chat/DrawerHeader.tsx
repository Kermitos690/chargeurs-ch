
import React from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DrawerHeader as UIDrawerHeader, DrawerTitle } from '@/components/ui/drawer';

interface DrawerHeaderProps {
  drawerMinimized: boolean;
  setDrawerMinimized: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  drawerMinimized,
  setDrawerMinimized,
  setIsOpen
}) => {
  return (
    <UIDrawerHeader className="p-4 flex justify-between items-center border-b">
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
    </UIDrawerHeader>
  );
};

export default DrawerHeader;
