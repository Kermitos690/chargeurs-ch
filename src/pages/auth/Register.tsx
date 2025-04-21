
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Battery, Loader2, UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Register = () => {
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

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
      case 'email-already-in-use':
        return "Cette adresse email est déjà utilisée par un autre compte";
      case 'auth/invalid-email':
      case 'invalid-email':
        return "Format d'adresse email invalide";
      case 'auth/weak-password':
      case 'weak-password':
        return "Le mot de passe est trop faible (minimum 6 caractères)";
      case 'auth/network-request-failed':
      case 'network-request-failed':
        return "Problème de connexion réseau. Vérifiez votre connexion internet.";
      case 'passwords-dont-match':
        return "Les mots de passe ne correspondent pas";
      case 'terms-not-accepted':
        return "Vous devez accepter les conditions d'utilisation";
      case 'duplicate-key':
        return "Cette adresse email est déjà utilisée par un autre compte";
      default:
        return "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
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
      
      // Étape 1: Vérifier si l'email existe déjà dans les profiles
      const { data: existingProfiles, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', email)
        .limit(1);
      
      if (profileCheckError) {
        console.error("Erreur lors de la vérification du profil:", profileCheckError);
        setErrorMessage("Une erreur technique est survenue. Veuillez réessayer.");
        setIsLoading(false);
        return;
      }
      
      if (existingProfiles && existingProfiles.length > 0) {
        console.log("Email déjà utilisé dans profiles:", email);
        setErrorMessage("Cette adresse email est déjà utilisée par un autre compte");
        setIsLoading(false);
        return;
      }
      
      // Étape 2: Vérifier si cet email existe déjà dans auth (double vérification)
      const { data: authData, error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      // Si pas d'erreur mais OTP envoyé, cela signifie que l'utilisateur existe déjà
      if (!authError && authData) {
        console.log("L'email existe déjà dans auth:", email);
        setErrorMessage("Cette adresse email est déjà utilisée par un autre compte");
        setIsLoading(false);
        return;
      }
      
      // Étape 3: Seulement maintenant, créer l'utilisateur avec Supabase Auth
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
      
      if (error) {
        console.error("Erreur Supabase lors de l'inscription:", {
          message: error.message,
          code: error.code,
          details: error
        });
        
        // Analyse de l'erreur pour donner un message approprié
        const errorMsg = error.message.toLowerCase();
        
        if (
          errorMsg.includes('already registered') || 
          errorMsg.includes('email already exists') ||
          errorMsg.includes('user already registered')
        ) {
          setErrorMessage("Cette adresse email est déjà utilisée par un autre compte");
        } else if (errorMsg.includes('network')) {
          setErrorMessage("Problème de connexion réseau. Veuillez vérifier votre connexion.");
        } else if (errorMsg.includes('database') || errorMsg.includes('db error')) {
          setErrorMessage("Erreur de base de données. Veuillez réessayer dans quelques instants.");
        } else {
          setErrorMessage("Une erreur technique est survenue. Veuillez réessayer.");
        }
        
        setIsLoading(false);
        return;
      }
      
      if (data && data.user) {
        console.log("Compte créé avec succès, id:", data.user.id);
        
        // Attendre un peu pour permettre aux triggers de terminer leur travail
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Compte créé avec succès",
          description: "Bienvenue sur chargeurs.ch !",
        });
        
        navigate('/stations');
      } else {
        setErrorMessage("Échec de création du compte. Veuillez réessayer.");
      }
      
    } catch (error: any) {
      console.error("Erreur finale lors de l'inscription:", error);
      
      // Vérifier s'il s'agit d'une erreur de clé dupliquée
      if (error.message && (
        error.message.includes('duplicate key') || 
        error.message.includes('user_details_pkey')
      )) {
        setErrorMessage("Cette adresse email est déjà utilisée par un autre compte");
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Veuillez réessayer plus tard.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
              <Battery className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Créer un compte</h1>
            <p className="text-muted-foreground mt-1">
              Inscrivez-vous pour accéder à nos bornes de recharge
            </p>
          </div>

          <Card>
            {errorMessage && (
              <div className="p-3 pt-6 px-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erreur d'inscription</AlertTitle>
                  <AlertDescription>
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <CardContent className="pt-6">
              <form onSubmit={handleRegister} className="space-y-4">
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
                    J'accepte les{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
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
            </CardContent>
            <CardFooter className="pt-4">
              <div className="text-center text-sm w-full">
                Déjà un compte?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
