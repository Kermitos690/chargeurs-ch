
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, KeyRound, Shield, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { confirmPasswordReset } from '@/services/firebase/auth';
import { useToast } from "@/hooks/use-toast";

const NewPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oobCode, setOobCode] = useState<string | null>(null);

  // Récupérer le code OOB depuis les paramètres d'URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');

    if (code) {
      setOobCode(code);
    } else {
      setError("Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oobCode) {
      setError("Code de réinitialisation manquant.");
      return;
    }

    // Validation des mots de passe
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Appeler la fonction de Firebase pour confirmer la réinitialisation
      const result = await confirmPasswordReset(oobCode, password);
      
      if (result.success) {
        setSuccess(true);
        toast({
          title: "Mot de passe mis à jour",
          description: "Votre mot de passe a été réinitialisé avec succès",
        });
        
        // Redirection automatique après 3 secondes
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      } else {
        setError(result.error || "Une erreur est survenue lors de la réinitialisation du mot de passe.");
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
        });
      }
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation:", error);
      setError(error.message || "Une erreur inattendue s'est produite.");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Créer un nouveau mot de passe</h1>
            <p className="text-muted-foreground mt-1">
              {!success 
                ? "Veuillez saisir votre nouveau mot de passe"
                : "Votre mot de passe a été mis à jour avec succès"
              }
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        placeholder="Minimum 6 caractères"
                        required
                        autoComplete="new-password"
                      />
                      <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Le mot de passe doit contenir au moins 6 caractères
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-10"
                        required
                        autoComplete="new-password"
                      />
                      <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mise à jour en cours...
                      </>
                    ) : (
                      "Réinitialiser mon mot de passe"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                    <h3 className="text-green-800 font-medium">Mot de passe mis à jour avec succès!</h3>
                    <p className="text-green-700 mt-1">
                      Vous allez être redirigé vers la page de connexion...
                    </p>
                  </div>
                  <Button onClick={() => navigate('/auth/login')} className="w-full">
                    Aller à la page de connexion
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-primary hover:underline text-sm"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Retour à la connexion
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewPassword;
