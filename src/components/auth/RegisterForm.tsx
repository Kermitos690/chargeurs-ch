
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserPlus, AlertCircle } from 'lucide-react';
import { auth, createUserWithEmailAndPassword, updateProfile, db } from '@/services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return "Cette adresse email est déjà utilisée par un autre compte";
      case 'auth/invalid-email':
        return "Format d'adresse email invalide";
      case 'auth/weak-password':
        return "Le mot de passe est trop faible (minimum 6 caractères)";
      case 'auth/network-request-failed':
        return "Problème de connexion réseau. Vérifiez votre connexion internet.";
      case 'passwords-dont-match':
        return "Les mots de passe ne correspondent pas";
      case 'terms-not-accepted':
        return "Vous devez accepter les conditions d'utilisation";
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
      setErrorMessage(getErrorMessage('auth/weak-password'));
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Tentative de création de compte pour:", email);
      
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("Compte créé avec succès, uid:", user.uid);
      
      // Update the user profile with the name
      await updateProfile(user, { displayName: name });
      console.log("Profil mis à jour avec le nom:", name);
      
      // Create a user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        email: email,
        name: name,
        phone: phone,
        subscriptionType: 'basic',
        createdAt: new Date()
      });
      
      console.log("Document utilisateur créé dans Firestore");
      
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur chargeurs.ch !",
      });
      
      onSuccess();
    } catch (error: any) {
      console.error("Erreur détaillée lors de l'inscription:", error);
      setErrorMessage(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Se connecter
          </Link>
        </div>
      </CardFooter>
    </>
  );
};

export default RegisterForm;
