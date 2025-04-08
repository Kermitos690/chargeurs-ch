
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterHeader from '@/components/auth/RegisterHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import MaintenanceMessage from '@/components/auth/MaintenanceMessage';
import { toast } from 'sonner';
import { BrowserRouter } from 'react-router-dom';

const RegisterContent = () => {
  const navigate = useNavigate();
  const [showMaintenanceMessage, setShowMaintenanceMessage] = useState(false);
  
  const handleRegisterSuccess = () => {
    toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
    // Redirection vers stations après inscription réussie
    navigate('/stations');
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
