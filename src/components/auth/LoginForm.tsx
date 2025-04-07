
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LogIn, AlertCircle } from 'lucide-react';
import { loginUser } from '@/services/firebase';

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

  React.useEffect(() => {
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
      const result = await loginUser(email, password);
      
      if (result.success) {
        // Réinitialiser les tentatives après une connexion réussie
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockoutUntil');
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à votre compte",
        });
        
        // Rediriger vers la page précédente ou la page d'accueil
        onSuccess(redirectPath);
      } else {
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
          setError(result.error || "Email ou mot de passe incorrect");
        }
        
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: result.error || "Email ou mot de passe incorrect",
        });
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

  return (
    <>
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading && !!localStorage.getItem('loginLockoutUntil')}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link to="/reset-password" className="text-sm text-primary hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading && !!localStorage.getItem('loginLockoutUntil')}
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
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || (!!localStorage.getItem('loginLockoutUntil') && Number(localStorage.getItem('loginLockoutUntil')) > Date.now())}
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="relative w-full my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">
              ou
            </span>
          </div>
        </div>
        <div className="text-center text-sm">
          Pas encore de compte?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Créer un compte
          </Link>
        </div>
      </CardFooter>
    </>
  );
};

export default LoginForm;
