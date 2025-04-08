
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer l'URL de redirection depuis l'état de location (si disponible)
  const from = location.state?.from?.pathname || '/stations';

  const handleLoginSuccess = (redirectPath: string) => {
    // Notification de succès
    toast.success("Connexion réussie!");
    
    console.log("Redirection après connexion vers:", redirectPath);
    
    // Rediriger vers la page précédente ou la page d'accueil
    navigate(redirectPath);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <LoginHeader />
          <Card>
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              redirectPath={from} 
            />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
