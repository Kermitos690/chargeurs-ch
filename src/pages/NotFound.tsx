
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 py-12 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <AlertCircle className="h-20 w-20 text-muted-foreground" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
                404
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-muted-foreground mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
          
          <div className="mt-12">
            <h2 className="text-lg font-medium mb-4">Vous recherchez peut-être</h2>
            <ul className="space-y-2 text-sm text-primary">
              <li>
                <Link to="/stations" className="hover:underline">Trouver une borne</Link>
              </li>
              <li>
                <Link to="/rentals" className="hover:underline">Mes locations</Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:underline">Nos abonnements</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contacter le support</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
