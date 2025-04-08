
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldX, ArrowLeft, Home, HelpCircle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 py-12 text-center">
          <div className="inline-block mb-6">
            <div className="p-6 rounded-full bg-red-500/10 animate-pulse">
              <ShieldX className="h-20 w-20 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Accès non autorisé</h1>
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas les droits nécessaires pour accéder à cette ressource.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 transition-colors">
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center justify-center border-primary/20 hover:bg-primary/5 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
          
          <div className="mt-12 space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-left">
              <div className="flex">
                <HelpCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">Besoin d'aide?</h3>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                    Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur du système.
                  </p>
                  <div className="mt-3">
                    <Link to="/contact" className="text-sm font-medium text-amber-800 dark:text-amber-300 hover:underline">
                      Contacter le support →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unauthorized;
