
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Battery, Loader2, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { resetPassword } from '@/services/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting to reset password for:", email);
      const result = await resetPassword(email);
      console.log("Reset password result:", result);
      
      if (result.success) {
        setEmailSent(true);
        toast({
          title: "Email envoyé",
          description: "Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email",
        });
      } else {
        setError(result.error || "Une erreur est survenue lors de l'envoi de l'email");
        toast({
          variant: "destructive",
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de l'envoi de l'email",
        });
      }
    } catch (error: any) {
      console.error("Error in reset password:", error);
      setError("Une erreur inattendue s'est produite");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
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
            <h1 className="text-2xl font-bold">Réinitialisation du mot de passe</h1>
            <p className="text-muted-foreground mt-1">
              {!emailSent 
                ? "Entrez votre email pour recevoir un lien de réinitialisation"
                : "Vérifiez votre boîte mail pour réinitialiser votre mot de passe"
              }
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              {!emailSent ? (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@exemple.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 p-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Envoyer un lien de réinitialisation
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-green-800">
                      Un email contenant un lien pour réinitialiser votre mot de passe a été envoyé à <strong>{email}</strong>.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Vérifiez votre dossier de spam si vous ne recevez pas l'email dans les prochaines minutes.
                    </p>
                    <p>
                      Cliquez sur le lien dans l'email pour être redirigé vers une page où vous pourrez créer un nouveau mot de passe.
                    </p>
                    <p className="font-medium text-primary">
                      Important: Le lien vous redirigera vers la page de connexion après avoir réinitialisé votre mot de passe.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-2" 
                    onClick={() => {
                      setEmailSent(false);
                      setEmail('');
                      setError(null);
                    }}
                  >
                    Réessayer avec une autre adresse
                  </Button>
                </div>
              )}
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
              <div className="text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Retour à la connexion
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

export default ResetPassword;
