
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { AlertCircle, ShoppingCart } from 'lucide-react';

const CheckoutCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Paiement annulé</h1>
          <p className="text-muted-foreground mb-8">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>
          
          <p className="mb-8">
            Les articles de votre panier sont toujours disponibles. Vous pouvez réessayer le paiement ou continuer vos achats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => navigate('/panier')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Retourner au panier
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/produits')}
            >
              Continuer les achats
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutCancel;
