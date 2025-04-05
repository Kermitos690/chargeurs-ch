
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { handleCheckoutSuccess } from '@/services/checkout';

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const processCheckout = async () => {
      if (!sessionId) {
        setError('ID de session manquant');
        setLoading(false);
        return;
      }

      try {
        const result = await handleCheckoutSuccess(sessionId);
        if (!result.success) {
          setError(result.error || 'Une erreur est survenue lors du traitement de votre commande');
        }
      } catch (error) {
        console.error('Erreur lors du traitement du paiement:', error);
        setError('Une erreur inattendue s\'est produite');
      } finally {
        setLoading(false);
      }
    };

    processCheckout();
  }, [sessionId]);

  const handleViewOrders = () => {
    navigate('/commandes');
  };

  const handleContinueShopping = () => {
    navigate('/produits');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Traitement de votre commande...</h2>
            <p className="text-muted-foreground mt-2">Veuillez patienter, ne fermez pas cette page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-lg mx-auto px-4">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl">Une erreur est survenue</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{error}</p>
                <p className="mt-4">
                  Si vous avez été débité, veuillez nous contacter à support@example.com
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button onClick={handleContinueShopping} className="w-full">
                  Retourner à la boutique
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Commande confirmée</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Merci pour votre commande ! Un e-mail de confirmation a été envoyé à votre adresse e-mail.
              </p>
              <div className="mt-8 bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Que se passe-t-il maintenant ?</h3>
                <ol className="text-sm text-muted-foreground text-left list-decimal list-inside space-y-2">
                  <li>Votre commande est en cours de traitement</li>
                  <li>Nous vous enverrons un e-mail lorsque votre commande sera expédiée</li>
                  <li>Vous pouvez suivre l'état de votre commande dans la section "Mes commandes"</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={handleContinueShopping} className="w-full">
                Continuer les achats
              </Button>
              <Button variant="outline" onClick={handleViewOrders} className="w-full">
                Voir mes commandes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
