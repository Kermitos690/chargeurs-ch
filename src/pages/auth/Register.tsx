
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterHeader from '@/components/auth/RegisterHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import MaintenanceMessage from '@/components/auth/MaintenanceMessage';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const navigate = useNavigate();
  const [showMaintenanceMessage, setShowMaintenanceMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const testCaptchaProtection = async () => {
      try {
        const { error } = await supabase.auth.signUp({
          email: `test-${Date.now()}@example.com`,
          password: 'test12345',
        });
        
        if (error && (error.message.includes('captcha') || error.message.includes('request disallowed'))) {
          console.log("Captcha protection détectée:", error.message);
          setShowMaintenanceMessage(true);
        }
      } catch (err) {
        console.error("Erreur lors du test de captcha:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Vérification si l'utilisateur est déjà connecté
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Si l'utilisateur est déjà connecté, le rediriger vers les stations
        navigate('/stations');
      } else {
        // Sinon, tester la protection captcha
        testCaptchaProtection();
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const handleRegisterSuccess = () => {
    console.log("Compte créé avec succès, redirection vers /stations");
    toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
    navigate('/stations', { replace: true });
  };

  const handleCaptchaError = () => {
    setShowMaintenanceMessage(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement...</p>
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
          <RegisterHeader />
          {showMaintenanceMessage ? (
            <MaintenanceMessage />
          ) : (
            <Card>
              <RegisterForm 
                onSuccess={handleRegisterSuccess} 
                onCaptchaError={handleCaptchaError}
              />
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
