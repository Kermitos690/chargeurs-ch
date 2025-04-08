
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MFAVerificationProps {
  factorId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const MFAVerification: React.FC<MFAVerificationProps> = ({ factorId, onSuccess, onCancel }) => {
  const [verifyCode, setVerifyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = async () => {
    if (verifyCode.length !== 6) {
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
      onSuccess();
    } catch (error: any) {
      console.error("Erreur lors de la vérification MFA:", error);
      setErrorMessage("Code incorrect. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vérification à deux facteurs</CardTitle>
        <CardDescription>
          Entrez le code de votre application d'authentification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
          </Alert>
        )}
        
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
        
        <div className="flex justify-between space-x-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleVerify}
            disabled={isLoading || verifyCode.length !== 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Vérification...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Vérifier
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MFAVerification;
