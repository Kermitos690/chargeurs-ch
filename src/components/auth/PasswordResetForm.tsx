
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Mail, Info } from 'lucide-react';
import { resetPassword } from '@/services/firebase/auth';
import { useToast } from "@/hooks/use-toast";

interface PasswordResetFormProps {
  onSuccess: (email: string) => void;
  onRetryCountUpdate: () => void;
  onRateLimitError: () => void;
}

export const PasswordResetForm = ({ 
  onSuccess, 
  onRetryCountUpdate, 
  onRateLimitError 
}: PasswordResetFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [showDetailedError, setShowDetailedError] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDetailedError(null);
    setShowDetailedError(false);

    try {
      console.log("Tentative de réinitialisation pour:", email);
      
      const result = await resetPassword(email);
      console.log("Résultat complet de la réinitialisation:", result);
      
      if (result.success) {
        onSuccess(email);
        toast({
          title: "Email envoyé",
          description: "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email",
        });
      } else {
        // Traduction améliorée des messages d'erreur
        let errorMessage = result.error || "Une erreur est survenue lors de l'envoi de l'email";
        
        // Messages d'erreur plus précis en français
        if (result.code === 'auth/user-not-found') {
          errorMessage = "Une erreur est survenue lors de la réinitialisation du mot de passe";
        } else if (result.code === 'auth/invalid-email') {
          errorMessage = "L'adresse email n'est pas valide";
        } else if (result.code === 'auth/too-many-requests') {
          errorMessage = "Trop de tentatives, veuillez réessayer plus tard";
        } else if (result.code === 'auth/network-request-failed') {
          errorMessage = "Problème de connexion réseau. Vérifiez votre connexion internet.";
        }
        
        setError(errorMessage);
        
        // Stocker l'erreur détaillée pour débogage
        if (result.details) {
          setDetailedError(result.details);
        }
        
        onRetryCountUpdate();
        
        // Afficher une boîte de dialogue spécifique pour les erreurs de limite de taux
        if (result.code === 'auth/too-many-requests' || 
            result.code === 'auth/reset-password-limit-exceeded' ||
            (result.error && result.error.includes('Limite de réinitialisation'))) {
          onRateLimitError();
        }
        
        toast({
          variant: "destructive",
          title: "Erreur",
          description: errorMessage,
        });
      }
    } catch (error: any) {
      console.error("Erreur inattendue dans la réinitialisation:", error);
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe");
      setDetailedError(error.message || "Erreur inconnue");
      onRetryCountUpdate();
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="nom@exemple.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-invalid={!!error}
        />
      </div>
      
      {error && (
        <div className="bg-red-50 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800 flex-1">
            <p>{error}</p>
            
            {detailedError && (
              <div className="mt-2">
                <button
                  type="button"
                  className="text-blue-700 text-xs flex items-center"
                  onClick={() => setShowDetailedError(!showDetailedError)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  {showDetailedError ? "Masquer les détails" : "Afficher les détails techniques"}
                </button>
                
                {showDetailedError && (
                  <pre className="mt-1 text-xs p-2 bg-red-100 rounded overflow-x-auto">
                    {detailedError}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="rounded-md bg-blue-50 p-3 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Si vous ne recevez pas l'email, vérifiez votre dossier spam. Assurez-vous que l'adresse email est correcte et associée à un compte.
            </p>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Envoyer un lien de réinitialisation
          </>
        )}
      </Button>
    </form>
  );
};
