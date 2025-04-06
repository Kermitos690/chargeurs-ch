
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface RentalPaymentProps {
  powerBank: {
    id: string;
    serialNumber: string;
    price: number;
  };
  onComplete: () => void;
  onCancel: () => void;
}

const RentalPayment: React.FC<RentalPaymentProps> = ({ powerBank, onComplete, onCancel }) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleRental = () => {
    setIsProcessing(true);
    // Simuler un processus de paiement/location
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard size={20} />
          Location de Powerbank
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Caution remboursable</span>
            <span>10.00 CHF</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frais initiaux</span>
            <span>{powerBank.price.toFixed(2)} CHF</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total à payer maintenant</span>
              <span>{(10 + powerBank.price).toFixed(2)} CHF</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">En confirmant la location, vous acceptez :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>De payer le tarif horaire de 2 CHF/h jusqu'au retour</li>
            <li>Que la caution sera remboursée au retour de la powerbank</li>
            <li>Les conditions générales d'utilisation du service</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={handleRental}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            "Confirmer et payer"
          )}
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Annuler
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RentalPayment;
