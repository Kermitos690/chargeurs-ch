
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_yourStripePublicKey');

interface PaymentOptionsProps {
  clientSecret: string;
  maxAmount: number;
  onSuccess: () => void;
  onCancel: () => void;
  onQRPaymentClick: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  clientSecret, 
  maxAmount, 
  onSuccess, 
  onCancel, 
  onQRPaymentClick 
}) => {
  return (
    <Tabs defaultValue="card">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="card">
          <CreditCard className="w-4 h-4 mr-2" />
          Carte bancaire
        </TabsTrigger>
        <TabsTrigger value="qr">
          <QrCode className="w-4 h-4 mr-2" />
          QR Code
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="card" className="mt-4">
        <div className="bg-muted p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pré-autorisation</span>
            <span className="font-medium">{maxAmount.toFixed(2)} CHF</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Ce montant n'est pas débité immédiatement. Seule la durée effective de location sera facturée.
          </p>
        </div>
        <Elements 
          stripe={stripePromise} 
          options={{
            clientSecret: clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#10b981',
                colorBackground: '#ffffff',
                colorText: '#1e293b',
              }
            }
          }}
        >
          <PaymentForm 
            clientSecret={clientSecret} 
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </Elements>
      </TabsContent>
      
      <TabsContent value="qr" className="mt-4">
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pré-autorisation</span>
              <span className="font-medium">{maxAmount.toFixed(2)} CHF</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ce montant n'est pas débité immédiatement. Seule la durée effective de location sera facturée.
            </p>
          </div>
          
          <div className="flex flex-col items-center py-4">
            <QrCode className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-4">
              Paiement rapide et sécurisé par QR code. Scannez et payez directement depuis votre téléphone.
            </p>
            <Button onClick={onQRPaymentClick}>
              Générer un QR code
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PaymentOptions;
