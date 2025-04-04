
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw } from 'lucide-react';

interface PasswordResetSuccessProps {
  email: string;
  onReset: () => void;
}

export const PasswordResetSuccess = ({ email, onReset }: PasswordResetSuccessProps) => {
  return (
    <div className="space-y-4 text-center">
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex justify-center mb-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-green-800">
          Un email contenant un lien pour réinitialiser votre mot de passe a été envoyé à <strong>{email}</strong>.
        </p>
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          Vérifiez votre dossier de spam si vous ne recevez pas l'email dans les prochaines minutes.
        </p>
        <p>
          Cliquez sur le lien dans l'email pour être redirigé vers une page où vous pourrez créer un nouveau mot de passe.
        </p>
        <p className="font-medium text-primary">
          Important: Le lien est valable pour une durée limitée.
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <Button 
          variant="outline" 
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer avec une autre adresse
        </Button>
      </div>
    </div>
  );
};
