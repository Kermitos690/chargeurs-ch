
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LoginErrorProps {
  error: string | null;
}

const LoginError: React.FC<LoginErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 p-3 rounded-md flex items-start mt-2 mb-2">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-red-800">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default LoginError;
