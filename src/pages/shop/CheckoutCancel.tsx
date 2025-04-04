
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

const CheckoutCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate('/panier');
  };

  const handleContinueShopping = () => {
    navigate('/produits');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="text-2xl">Paiement annulé</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Votre paiement a été annulé. Ne vous inquiétez pas, aucun montant n'a été débité de votre compte.
              </p>
              <p className="mt-4 text-muted-foreground">
                Les articles de votre panier sont toujours disponibles si vous souhaitez finaliser votre achat.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={handleReturnToCart} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retourner au panier
              </Button>
              <Button variant="outline" onClick={handleContinueShopping} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Continuer les achats
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutCancel;
