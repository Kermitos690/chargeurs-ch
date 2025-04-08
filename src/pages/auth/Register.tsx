
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
  
  // Vérifier si la captcha protection est active
  useEffect(() => {
    const testCaptchaProtection = async () => {
      try {
        // Tentative de création d'un compte avec des identifiants factices pour tester
        const { error } = await supabase.auth.signUp({
          email: `test-${Date.now()}@example.com`,
          password: 'test12345',
        });
        
        // Si on reçoit une erreur de captcha, on affiche le message de maintenance
        if (error && (error.message.includes('captcha') || error.message.includes('request disallowed'))) {
          console.log("Captcha protection détectée:", error.message);
          setShowMaintenanceMessage(true);
        }
      } catch (err) {
        console.error("Erreur lors du test de captcha:", err);
      }
    };
    
    // Exécuter le test après le chargement du composant
    testCaptchaProtection();
  }, []);
  
  const handleRegisterSuccess = () => {
    toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
    // Redirection vers stations après inscription réussie
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

// Composant wrapper qui utilise le router correctement
const Register = () => {
  // Vérifier si nous sommes déjà dans un contexte Router
  if (typeof window !== 'undefined' && window.location.pathname === '/register') {
    return <RegisterContent />;
  }
  
  // Sinon, fournir un BrowserRouter
  return (
    <BrowserRouter>
      <RegisterContent />
    </BrowserRouter>
  );
};

export default Register;
