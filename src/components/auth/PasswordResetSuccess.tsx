
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, AlertTriangle, ExternalLink } from 'lucide-react';

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
        <h3 className="font-medium text-green-800 mb-1">Email envoyé avec succès</h3>
        <p className="text-green-800">
          Un email contenant un lien pour réinitialiser votre mot de passe a été envoyé à <strong>{email}</strong>.
        </p>
      </div>
      
      <div className="text-sm space-y-4">
        <div className="rounded-md bg-amber-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3 text-left">
              <h3 className="text-sm font-medium text-amber-800">Instructions importantes</h3>
              <div className="mt-2 text-sm text-amber-700">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Vérifiez votre dossier de spam/indésirables</li>
                  <li>L'email provient de "noreply@chargeurs-ch.firebaseapp.com"</li>
                  <li>Le lien expire dans 24 heures</li>
                  <li>Si vous ne recevez pas l'email, essayez d'ajouter cette adresse à vos contacts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-muted-foreground space-y-2 text-left">
          <p className="font-medium">Comment ça marche :</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Ouvrez l'email intitulé "Réinitialisation de votre mot de passe"</li>
            <li>Cliquez sur le bouton ou lien "Réinitialiser le mot de passe"</li>
            <li>Vous serez redirigé vers une page pour créer un nouveau mot de passe</li>
            <li>Créez un nouveau mot de passe sécurisé</li>
            <li>Connectez-vous avec votre nouveau mot de passe</li>
          </ol>
        </div>
      </div>
      
      <div className="pt-2 space-y-3">
        <p className="text-sm text-gray-600 mb-1">
          Si vous n'avez pas reçu l'email après quelques minutes :
        </p>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="w-full"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer avec une autre adresse
        </Button>
        
        <a 
          href="mailto:support@chargeurs.ch" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block text-xs text-gray-500 hover:underline mt-2"
        >
          Problème persistant ? Contactez notre support
          <ExternalLink className="inline-block ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  );
};
