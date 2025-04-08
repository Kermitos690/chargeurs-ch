
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterHeader from '@/components/auth/RegisterHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  
  const handleRegisterSuccess = () => {
    toast.success("Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.");
    navigate('/stations');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <RegisterHeader />
          <Card>
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
