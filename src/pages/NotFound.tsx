
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, ArrowLeft, Home, Shield, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 py-12 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="p-6 rounded-full bg-muted/20 animate-pulse">
                <AlertCircle className="h-20 w-20 text-muted-foreground" />
              </div>
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
          
          <div className="mt-10 pt-8 border-t border-border">
            <div className="mb-4 flex items-center justify-center">
              <Search className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium">Essayez ces pages</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li>
                <Link to="/stations" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  Trouver une borne
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  Mes locations
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  Nos abonnements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  Contacter le support
                </Link>
              </li>
              <li>
                <Link to="/login" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" className="block p-3 rounded-md border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  S'inscrire
                </Link>
              </li>
              <li className="sm:col-span-2">
                <Link to="/admin/login" className="block p-3 rounded-md border border-border bg-gray-900/50 hover:bg-gray-900/80 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Espace Administration</span>
                  </div>
                </Link>
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
