
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, KeyRound, QrCode, ShieldAlert, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const MFASetup: React.FC = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);
  const [existingFactors, setExistingFactors] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Vérifier si l'utilisateur a déjà configuré MFA
    checkExistingFactors();
  }, [user, navigate]);

  const checkExistingFactors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) {
        throw error;
      }
      
      if (data.totp && data.totp.length > 0) {
        setExistingFactors(data.totp);
        // Vérifier si un facteur est déjà vérifié
        const verifiedFactor = data.totp.find(factor => factor.verified);
        if (verifiedFactor) {
          setSetupComplete(true);
        }
      }
    } catch (error: any) {
      console.error("Erreur lors de la vérification des facteurs MFA:", error);
      setErrorMessage("Impossible de charger les informations MFA. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const startTOTPSetup = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.id && data?.totp) {
        setFactorId(data.id);
        setQrCode(data.totp.qr_code);
      } else {
        throw new Error("Données TOTP manquantes dans la réponse");
      }
    } catch (error: any) {
      console.error("Erreur lors de la configuration TOTP:", error);
      setErrorMessage("Erreur lors de la configuration de l'authentification à deux facteurs. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTOTP = async () => {
    if (!factorId || !verifyCode || verifyCode.length !== 6) {
      setErrorMessage("Veuillez entrer un code à 6 chiffres valide");
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const { data, error } = await supabase.auth.mfa.challenge({
        factorId: factorId
      });
      
      if (error) {
        throw error;
      }
      
      const challengeId = data.id;
      
      const { data: verifyData, error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factorId,
        challengeId: challengeId,
        code: verifyCode
      });
      
      if (verifyError) {
        throw verifyError;
      }
      
      // Vérification réussie
      setSetupComplete(true);
      setQrCode(null);
      setFactorId(null);
      setVerifyCode('');
      toast.success("Configuration MFA réussie! Votre compte est maintenant plus sécurisé.");
      
      // Rafraîchir la liste des facteurs
      checkExistingFactors();
    } catch (error: any) {
      console.error("Erreur lors de la vérification TOTP:", error);
      setErrorMessage("Le code entré est incorrect. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const disableMFA = async (factorId: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: factorId
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("L'authentification à deux facteurs a été désactivée.");
      setSetupComplete(false);
      
      // Rafraîchir la liste des facteurs
      checkExistingFactors();
    } catch (error: any) {
      console.error("Erreur lors de la désactivation MFA:", error);
      setErrorMessage("Erreur lors de la désactivation de l'authentification à deux facteurs. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !qrCode && existingFactors.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4">Chargement des informations MFA...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Authentification à deux facteurs (MFA)</h1>
          <p className="text-center mb-8 text-muted-foreground">
            Ajoutez une couche de sécurité supplémentaire en exigeant une vérification via une application d'authentification.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Configuration MFA</CardTitle>
              <CardDescription>
                {setupComplete 
                  ? "Votre compte est protégé par l'authentification à deux facteurs"
                  : "Configurez une application d'authentification comme Google Authenticator ou Authy"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              {setupComplete ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium">Authentification à deux facteurs</p>
                        <p className="text-sm text-muted-foreground">Activée</p>
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => existingFactors.length > 0 && disableMFA(existingFactors[0].id)}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Désactiver"}
                    </Button>
                  </div>
                  
                  <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertDescription className="ml-2">
                      Vous serez invité à saisir un code à chaque connexion
                    </AlertDescription>
                  </Alert>
                </div>
              ) : qrCode ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. Scannez ce code QR avec votre application d'authentification</h3>
                    <div className="flex justify-center p-4 bg-white">
                      <img src={qrCode} alt="QR Code" className="max-w-full h-64" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">2. Entrez le code à 6 chiffres de votre application</h3>
                    <div className="flex justify-center mb-4">
                      <InputOTP
                        value={verifyCode}
                        onChange={setVerifyCode}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setQrCode(null);
                          setFactorId(null);
                        }}
                        disabled={isLoading}
                      >
                        Annuler
                      </Button>
                      <Button 
                        onClick={verifyTOTP}
                        disabled={isLoading || verifyCode.length !== 6}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Vérification...
                          </>
                        ) : "Vérifier"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-start mb-4">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <KeyRound className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Application d'authentification</h3>
                        <p className="text-sm text-muted-foreground">
                          Utilisez une application comme Google Authenticator, Authy ou Microsoft Authenticator
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={startTOTPSetup}
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Préparation...
                        </>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Configurer l'authentification à deux facteurs
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MFASetup;
