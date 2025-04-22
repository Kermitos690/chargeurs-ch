
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { validateRegistrationData } from '@/utils/auth/validation';
import { handleRegistrationError } from '@/utils/auth/errorHandling';
import { supabase } from '@/integrations/supabase/client';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    // Validate form data
    const validationError = validateRegistrationData({
      email,
      password,
      confirmPassword,
      acceptTerms
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Tentative de création de compte pour:", email);
      
      // Check if email exists in profiles
      const { data: existingProfiles, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .limit(1);
      
      if (profileCheckError) {
        console.error("Erreur lors de la vérification du profil:", profileCheckError);
        throw new Error("technical_error");
      }
      
      if (existingProfiles && existingProfiles.length > 0) {
        throw new Error("email-already-in-use");
      }
      
      // Verify if email exists in auth
      const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      if (!authError && authData) {
        throw new Error("email-already-in-use");
      }
      
      // Create user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone
          }
        }
      });
      
      if (error) throw error;
      
      if (data && data.user) {
        console.log("Compte créé avec succès, id:", data.user.id);
        
        // Wait for triggers to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Compte créé avec succès",
          description: "Bienvenue sur chargeurs.ch !",
        });
        
        if (onSuccess) {
          onSuccess();
        }
        
        navigate('/stations');
      } else {
        throw new Error("registration_failed");
      }
      
    } catch (error: any) {
      console.error("Erreur finale lors de l'inscription:", error);
      const errorMsg = handleRegistrationError(error);
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur d'inscription</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet</Label>
        <Input
          id="name"
          placeholder="Jean Dupont"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="nom@exemple.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+41 XX XXX XX XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          J'accepte les conditions d'utilisation et la politique de confidentialité
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Inscription en cours...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            S'inscrire
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
