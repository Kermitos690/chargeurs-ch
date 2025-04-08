
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MaintenanceMessageProps {
  message?: string;
}

const MaintenanceMessage: React.FC<MaintenanceMessageProps> = ({ 
  message = "Le service est en maintenance. Veuillez réessayer plus tard ou contacter le support."
}) => {
  return (
    <div className="bg-red-50 p-4 rounded-md flex items-start mb-6">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-red-800">
        <p>{message}</p>
        <p className="mt-2 text-xs">
          Si ce problème persiste, veuillez contacter l'administrateur pour désactiver la protection par captcha dans les paramètres Supabase.
        </p>
      </div>
    </div>
  );
};

export default MaintenanceMessage;
