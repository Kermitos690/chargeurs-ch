
import React, { useState, useEffect } from 'react';
import { 
  CardContent
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import LoginError from './LoginError';
import LoginFormFields from './LoginFormFields';
import LoginButton from './LoginButton';
import LoginFooter from './LoginFooter';
import { toast } from 'sonner';

interface LoginFormProps {
  onSuccess: (redirectPath: string) => void;
  redirectPath?: string;
}

const LoginForm = ({ onSuccess, redirectPath = '/stations' }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { toast: uiToast } = useToast();

  // Limite le nombre de tentatives de connexion
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

  useEffect(() => {
    // Vérifier s'il y a un verrou de connexion
    const lockoutUntil = localStorage.getItem('loginLockoutUntil');
    if (lockoutUntil && Number(lockoutUntil) > Date.now()) {
      const remainingMinutes = Math.ceil((Number(lockoutUntil) - Date.now()) / 60000);
      setError(`Compte temporairement bloqué. Réessayez dans ${remainingMinutes} minute(s).`);
      setIsLoading(true);
    } else if (lockoutUntil) {
      // Effacer le verrou si le temps est écoulé
      localStorage.removeItem('loginLockoutUntil');
      localStorage.removeItem('loginAttempts');
      setLoginAttempts(0);
    }

    // Récupérer le nombre de tentatives précédentes
    const savedAttempts = localStorage.getItem('loginAttempts');
    if (savedAttempts) {
      setLoginAttempts(Number(savedAttempts));
    }
  }, []);

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'Invalid login credentials':
        return "Email ou mot de passe incorrect";
      case 'Email not confirmed':
        return "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception";
      case 'User not found':
        return "Aucun compte trouvé avec cet email";
      case 'Too many requests':
        return "Trop de tentatives de connexion. Veuillez réessayer plus tard";
      case 'network-request-failed':
        return "Problème de connexion réseau. Vérifiez votre connexion internet";
      default:
        return "Une erreur est survenue lors de la connexion. Veuillez réessayer. (" + errorCode + ")";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Vérifier si l'utilisateur est verrouillé
    const lockoutUntil = localStorage.getItem('loginLockoutUntil');
    if (lockoutUntil && Number(lockoutUntil) > Date.now()) {
      const remainingMinutes = Math.ceil((Number(lockoutUntil) - Date.now()) / 60000);
      setError(`Compte temporairement bloqué. Réessayez dans ${remainingMinutes} minute(s).`);
      return;
    }
    
    setIsLoading(true);
    
    // Validation de base
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Tentative de connexion pour:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Erreur de connexion:", error);
        
        // Incrémenter et enregistrer le nombre de tentatives
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', String(newAttempts));
        
        // Vérifier si l'utilisateur doit être verrouillé
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION;
          localStorage.setItem('loginLockoutUntil', String(lockoutTime));
          setError(`Trop de tentatives échouées. Compte bloqué pendant 5 minutes.`);
        } else {
          setError(getErrorMessage(error.message));
        }
        
        toast.error("Erreur de connexion: " + getErrorMessage(error.message));
      } else {
        // Réinitialiser les tentatives après une connexion réussie
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockoutUntil');
        
        toast.success("Connexion réussie! Bienvenue sur Chargeurs.ch");
        
        console.log("Connexion réussie, redirection vers:", redirectPath);
        
        // Attendre un peu avant de rediriger pour que l'utilisateur voie le message de succès
        setTimeout(() => {
          // Rediriger vers la page précédente ou la page d'accueil
          onSuccess(redirectPath);
        }, 1000);
      }
    } catch (error: any) {
      console.error("Erreur inattendue:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer plus tard.");
      
      toast.error("Erreur de connexion: Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  // Déterminer si le formulaire est désactivé en fonction du verrouillage
  const isFormDisabled = isLoading && !!localStorage.getItem('loginLockoutUntil') && 
    Number(localStorage.getItem('loginLockoutUntil')) > Date.now();

  return (
    <>
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <LoginFormFields 
            email={email} 
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isDisabled={isFormDisabled}
          />
          
          <LoginError error={error} />
          
          <LoginButton 
            isLoading={isLoading} 
            isDisabled={isFormDisabled}
          />
        </form>
      </CardContent>
      <LoginFooter />
    </>
  );
};

export default LoginForm;
