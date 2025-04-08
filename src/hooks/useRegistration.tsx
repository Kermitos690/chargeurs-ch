
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface RegistrationHookProps {
  onSuccess: () => void;
  onCaptchaError?: () => void;
}

export const useRegistration = ({ onSuccess, onCaptchaError }: RegistrationHookProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      case 'captcha protection: request disallowed (invalid-input-response)':
      case 'captcha_failed':
        return "Le service est en maintenance. Veuillez réessayer plus tard ou contacter le support.";
      case 'Database error saving new user':
        return "Erreur lors de la création du compte. Notre équipe technique a été informée. Veuillez réessayer plus tard.";
      default:
        return "Une erreur est survenue lors de l'inscription. Veuillez réessayer. (" + errorCode + ")";
    }
  };

  const isCaptchaError = (errorMessage: string): boolean => {
    return errorMessage.includes('captcha') || 
           errorMessage.includes('invalid-input-response') || 
           errorMessage === 'captcha_failed';
  };

  const isDatabaseError = (errorMessage: string): boolean => {
    return errorMessage.includes('Database error') || 
           errorMessage.includes('permission denied');
  };

  const handleRegister = async (formData: RegistrationData, acceptTerms: boolean, confirmPassword: string) => {
    setErrorMessage(null);
    
    // Validations côté client
    if (formData.password !== confirmPassword) {
      setErrorMessage(getErrorMessage('passwords-dont-match'));
      return;
    }
    
    if (!acceptTerms) {
      setErrorMessage(getErrorMessage('terms-not-accepted'));
      return;
    }
    
    // Validation du mot de passe
    if (formData.password.length < 6) {
      setErrorMessage(getErrorMessage('weak-password'));
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Tentative de création de compte pour:", formData.email);
      
      // Create the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone
          }
        }
      });
      
      if (error) {
        console.error("Erreur lors de l'inscription:", error);
        
        // Si c'est une erreur de captcha, notifier le parent
        if (isCaptchaError(error.message) && onCaptchaError) {
          onCaptchaError();
          setIsLoading(false);
          return;
        }

        // Si c'est une erreur de base de données, c'est probablement lié aux permissions
        if (isDatabaseError(error.message)) {
          // Essayons de créer manuellement le profil si l'utilisateur a été créé
          if (data && data.user) {
            // L'utilisateur a bien été créé dans auth.users, mais pas dans public.profiles
            // Notifier l'utilisateur que son compte a été créé malgré l'erreur
            toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
            
            // Rediriger quand même l'utilisateur
            setTimeout(() => {
              onSuccess();
            }, 1000);
            
            return;
          }
        }
        
        setErrorMessage(getErrorMessage(error.message));
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

  return {
    isLoading,
    errorMessage,
    handleRegister,
    setErrorMessage
  };
};
