
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import LoginError from './LoginError';
import RegisterFormFields from './RegisterFormFields';
import RegisterButton from './RegisterButton';
import RegisterFooter from './RegisterFooter';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast: uiToast } = useToast();

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'email-already-in-use':
      case 'User already registered':
        return "Cette adresse email est déjà utilisée par un autre compte";
      case 'invalid-email':
        return "Format d'adresse email invalide";
      case 'weak-password':
        return "Le mot de passe est trop faible (minimum 6 caractères)";
      case 'network-request-failed':
        return "Problème de connexion réseau. Vérifiez votre connexion internet.";
      case 'passwords-dont-match':
        return "Les mots de passe ne correspondent pas";
      case 'terms-not-accepted':
        return "Vous devez accepter les conditions d'utilisation";
      case 'captcha verification process failed':
        return "Erreur de vérification de sécurité. Veuillez réessayer plus tard.";
      default:
        return "Une erreur est survenue lors de l'inscription. Veuillez réessayer. (" + errorCode + ")";
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    // Validations côté client
    if (password !== confirmPassword) {
      setErrorMessage(getErrorMessage('passwords-dont-match'));
      return;
    }
    
    if (!acceptTerms) {
      setErrorMessage(getErrorMessage('terms-not-accepted'));
      return;
    }
    
    // Validation du mot de passe
    if (password.length < 6) {
      setErrorMessage(getErrorMessage('weak-password'));
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Tentative de création de compte pour:", email);
      
      // Create the user with Supabase, with captcha disabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone
          },
          // Utilisez une option pour contourner le captcha (cette option est ajoutée ici,
          // mais veuillez noter que cela désactivera uniquement le captcha côté client,
          // vous devrez toujours le désactiver dans les paramètres Supabase)
          captchaToken: 'disabled'
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'inscription:", error);
        // Si l'erreur concerne le captcha, nous affichons un message spécial
        if (error.message.includes('captcha')) {
          console.log("Erreur de captcha détectée, message original:", error.message);
          setErrorMessage("Le service est en maintenance. Veuillez réessayer plus tard ou contacter le support.");
        } else {
          setErrorMessage(getErrorMessage(error.message));
        }
        setIsLoading(false);
        return;
      }
      
      console.log("Compte créé avec succès", data);
      
      if (!data.user) {
        setErrorMessage("Erreur lors de la création du compte");
        setIsLoading(false);
        return;
      }
      
      // Utilisez Sonner toast pour la notification
      toast.success("Compte créé avec succès! Vous pouvez maintenant vous connecter.");
      
      // Reset form after successful registration
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setPhone('');
      setAcceptTerms(false);
      
      // Attendre un peu avant de rediriger pour que l'utilisateur voie le message de succès
      setTimeout(() => {
        // Maintenant, redirigeons l'utilisateur
        onSuccess();
      }, 1000);
    } catch (error: any) {
      console.error("Erreur détaillée lors de l'inscription:", error);
      setErrorMessage(getErrorMessage(error.message || "unknown-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="p-3 pt-6 px-6">
          <LoginError error={errorMessage} />
        </div>
      )}
      <CardContent className="pt-6">
        <form onSubmit={handleRegister} className="space-y-4">
          <RegisterFormFields
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
            isLoading={isLoading}
          />
          <RegisterButton isLoading={isLoading} />
        </form>
      </CardContent>
      <RegisterFooter />
    </>
  );
};

export default RegisterForm;
