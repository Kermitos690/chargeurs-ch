
import React from 'react';
import { Loader2 } from 'lucide-react';

const RentalLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p>Préparation de votre location...</p>
    </div>
  );
};

export default RentalLoading;
