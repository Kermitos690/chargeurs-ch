import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterHeader from '@/components/auth/RegisterHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import MaintenanceMessage from '@/components/auth/MaintenanceMessage';
import { toast } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const RegisterContent = () => {
  const navigate = useNavigate();
  const [showMaintenanceMessage, setShowMaintenanceMessage] = useState(false);
  
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
      }
    };
    
    testCaptchaProtection();
  }, []);
  
  const handleRegisterSuccess = () => {
    toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
    navigate('/stations');
  };

  const handleCaptchaError = () => {
    setShowMaintenanceMessage(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <RegisterHeader />
          {showMaintenanceMessage && (
            <MaintenanceMessage />
          )}
          <Card>
            <RegisterForm 
              onSuccess={handleRegisterSuccess} 
              onCaptchaError={handleCaptchaError}
            />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Register = () => {
  if (typeof window !== 'undefined' && window.location.pathname === '/register') {
    return <RegisterContent />;
  }
  
  return (
    <BrowserRouter>
      <RegisterContent />
    </BrowserRouter>
  );
};

export default Register;
