
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AdminLoginErrorProps {
  errorMessage: string | null;
}

const AdminLoginError = ({ errorMessage }: AdminLoginErrorProps) => {
  if (!errorMessage) return null;
  
  return (
    <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default AdminLoginError;
