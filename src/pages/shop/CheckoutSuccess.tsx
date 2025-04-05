
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { handleCheckoutSuccess } from '@/services/checkout';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const processCheckoutSuccess = async () => {
      if (sessionId) {
        await handleCheckoutSuccess(sessionId);
      }
    };

    processCheckoutSuccess();
  }, [sessionId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Paiement réussi !</h1>
            <p className="text-muted-foreground">
              Nous vous remercions pour votre commande. Votre paiement a bien été reçu.
            </p>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="font-semibold text-lg mb-4">Détails de la commande</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Numéro de commande:</span>
                <span className="font-medium">ORD-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Statut:</span>
                <span className="font-medium text-green-600">Payée</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => navigate('/produits')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continuer vos achats
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
