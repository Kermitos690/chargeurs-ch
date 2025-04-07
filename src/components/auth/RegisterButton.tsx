
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from 'lucide-react';

interface RegisterButtonProps {
  isLoading: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ isLoading }) => {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Inscription en cours...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          S'inscrire
        </>
      )}
    </Button>
  );
};

export default RegisterButton;
