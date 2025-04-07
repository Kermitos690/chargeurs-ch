
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
  const { toast } = useToast();

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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
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
          setError(error.message || "Email ou mot de passe incorrect");
        }
        
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message || "Email ou mot de passe incorrect",
        });
      } else {
        // Réinitialiser les tentatives après une connexion réussie
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockoutUntil');
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à votre compte",
        });
        
        // Rediriger vers la page précédente ou la page d'accueil
        onSuccess(redirectPath);
      }
    } catch (error: any) {
      setError("Une erreur inattendue s'est produite. Veuillez réessayer plus tard.");
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur inattendue s'est produite",
      });
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
