
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from 'lucide-react';

interface LoginButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading, isDisabled }) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connexion en cours...
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Se connecter
        </>
      )}
    </Button>
  );
};

export default LoginButton;
