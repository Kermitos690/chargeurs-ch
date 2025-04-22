
import React from 'react';
import { Link } from 'react-router-dom';
import { Battery } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
              <Battery className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Créer un compte</h1>
            <p className="text-muted-foreground mt-1">
              Inscrivez-vous pour accéder à nos bornes de recharge
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <RegisterForm />
            </CardContent>
            <CardFooter className="pt-4">
              <div className="text-center text-sm w-full">
                Déjà un compte?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Se connecter
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

export default Register;
