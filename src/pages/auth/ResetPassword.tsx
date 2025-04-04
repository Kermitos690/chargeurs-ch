
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Battery, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { PasswordResetSuccess } from '@/components/auth/PasswordResetSuccess';
import { RateLimitDialog } from '@/components/auth/RateLimitDialog';

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  const handleResetSuccess = (emailAddress: string) => {
    setEmailSent(true);
    setEmail(emailAddress);
    setRetryCount(0);
  };

  const handleRetry = () => {
    setEmailSent(false);
    setEmail('');
  };

  const handleRetryCountUpdate = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleRateLimitError = () => {
    setShowLimitDialog(true);
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
                <PasswordResetForm 
                  onSuccess={handleResetSuccess} 
                  onRetryCountUpdate={handleRetryCountUpdate}
                  onRateLimitError={handleRateLimitError}
                />
              ) : (
                <PasswordResetSuccess 
                  email={email} 
                  onReset={handleRetry} 
                />
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

      {/* Rate limit dialog */}
      <RateLimitDialog 
        open={showLimitDialog} 
        onOpenChange={setShowLimitDialog} 
      />
    </div>
  );
};

export default ResetPassword;
