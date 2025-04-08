
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import LoginError from './LoginError';
import LoginFormFields from './LoginFormFields';
import LoginButton from './LoginButton';
import LoginFooter from './LoginFooter';
import MFAVerification from './MFAVerification';
import { toast } from 'sonner';

interface LoginFormProps {
  onSuccess: (redirectPath: string) => void;
  redirectPath?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectPath = '/stations' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const { toast: uiToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      console.log("Tentative de connexion pour:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Erreur lors de la connexion:", error);
        
        if (error.message === 'Invalid login credentials') {
          setErrorMessage("Email ou mot de passe incorrect");
        } else {
          setErrorMessage(error.message);
        }
        
        setIsLoading(false);
        return;
      }
      
      console.log("Résultat connexion:", data);
      
      // Vérifier si MFA est requis
      if (data.session === null && data.user !== null) {
        // L'utilisateur a MFA activé
        const { data: mfaData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        
        console.log("MFA Data:", mfaData);
        
        if (mfaData.nextLevel === 'aal2' && mfaData.currentLevel === 'aal1') {
          // Récupérer les facteurs MFA
          const { data: factorsData } = await supabase.auth.mfa.listFactors();
          
          console.log("MFA Factors:", factorsData);
          
          if (factorsData.totp && factorsData.totp.length > 0) {
            // Prendre le premier facteur TOTP
            const factor = factorsData.totp[0];
            setMfaFactorId(factor.id);
            setIsLoading(false);
            return;
          }
        }
      }
      
      // Connexion réussie sans MFA ou MFA déjà vérifié
      handleSuccessfulLogin();
    } catch (error: any) {
      console.error("Erreur critique lors de la connexion:", error);
      setErrorMessage("Une erreur est survenue lors de la connexion");
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = () => {
    // Réinitialiser les champs
    setEmail('');
    setPassword('');
    setIsLoading(false);
    setMfaFactorId(null);
    
    // Notification et redirection
    toast.success("Connexion réussie!");
    onSuccess(redirectPath);
  };

  const handleMfaSuccess = () => {
    handleSuccessfulLogin();
  };

  const handleMfaCancel = () => {
    // Déconnexion car l'utilisateur a annulé la vérification MFA
    supabase.auth.signOut().then(() => {
      setMfaFactorId(null);
      setIsLoading(false);
    });
  };

  // Si MFA est requis, afficher l'interface de vérification MFA
  if (mfaFactorId) {
    return (
      <CardContent className="pt-6">
        <MFAVerification 
          factorId={mfaFactorId}
          onSuccess={handleMfaSuccess}
          onCancel={handleMfaCancel}
        />
      </CardContent>
    );
  }

  return (
    <>
      {errorMessage && (
        <div className="p-3 pt-6 px-6">
          <LoginError error={errorMessage} />
        </div>
      )}
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <LoginFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <LoginButton isDisabled={isLoading} />
        </form>
      </CardContent>
      <LoginFooter />
    </>
  );
};

export default LoginForm;
