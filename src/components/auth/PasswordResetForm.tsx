
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Mail } from 'lucide-react';
import { resetPassword } from '@/services/firebase/auth';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Tentative de réinitialisation pour:", email);
      
      const result = await resetPassword(email);
      console.log("Résultat de la réinitialisation:", result);
      
      if (result.success) {
        onSuccess(email);
        toast({
          title: "Email envoyé",
          description: "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email",
        });
      } else {
        setError(result.error || "Une erreur est survenue lors de l'envoi de l'email");
        onRetryCountUpdate();
        
        // Show special dialog for rate limit errors
        if (result.code === 'auth/too-many-requests' || 
            result.code === 'auth/reset-password-limit-exceeded' ||
            (result.error && result.error.includes('Limite de réinitialisation'))) {
          onRateLimitError();
        }
        
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de l'envoi de l'email",
        });
      }
    } catch (error: any) {
      console.error("Erreur dans la réinitialisation:", error);
      setError("Une erreur inattendue s'est produite");
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
        />
      </div>
      
      {error && (
        <div className="bg-red-50 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <p>{error}</p>
          </div>
        </div>
      )}
      
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
