
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface MobileFilterToggleProps {
  onClick: () => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      className="md:hidden"
      onClick={onClick}
    >
      <Filter className="h-4 w-4 mr-2" />
      Filtres
    </Button>
  );
};

export default MobileFilterToggle;
