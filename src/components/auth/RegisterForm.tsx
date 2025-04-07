
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { auth, createUserWithEmailAndPassword, updateProfile, db } from '@/services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast";
import LoginError from './LoginError';
import RegisterFormFields from './RegisterFormFields';
import RegisterButton from './RegisterButton';
import RegisterFooter from './RegisterFooter';

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
