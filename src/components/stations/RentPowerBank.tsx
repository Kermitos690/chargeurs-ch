import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CreditCard, CheckCircle, AlertCircle, ShieldCheck, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { startRentalWithPreAuth } from '@/services/rentalPayment';
import { useAuth } from '@/hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import QRPaymentDialog from '@/components/qr/QRPaymentDialog';

// Remplacer par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_yourStripePublicKey');

const MAX_RENTAL_AMOUNT = 30; // Montant maximum préautorisé en CHF

interface RentPowerBankProps {
  stationId: string;
  availablePowerBanks: number;
  onSuccess?: () => void;
}

const PaymentForm = ({ clientSecret, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/rentals',
      },
      redirect: 'if_required',
    });

    if (result.error) {
      console.error('Erreur de paiement:', result.error);
      toast.error('Erreur de paiement: ' + result.error.message);
      setPaymentStatus('error');
    } else {
      setPaymentStatus('success');
      toast.success('Paiement confirmé, powerbank déverrouillée !');
      if (onSuccess) onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {paymentStatus === 'success' ? (
        <div className="bg-green-50 p-4 rounded-md flex items-center gap-3">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="font-medium text-green-800">Pré-autorisation validée</p>
            <p className="text-sm text-green-700">Votre powerbank est déverrouillée et prête à être utilisée</p>
          </div>
        </div>
      ) : paymentStatus === 'error' ? (
        <div className="bg-red-50 p-4 rounded-md flex items-center gap-3">
          <AlertCircle className="text-red-600" />
          <div>
            <p className="font-medium text-red-800">Erreur de paiement</p>
            <p className="text-sm text-red-700">Veuillez vérifier vos informations de paiement et réessayer</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pré-autorisation</span>
                <span className="font-medium">{MAX_RENTAL_AMOUNT.toFixed(2)} CHF</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ce montant n'est pas débité immédiatement. Seule la durée effective de location sera facturée.
              </p>
            </div>
            <PaymentElement />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
              Annuler
            </Button>
            <Button type="submit" disabled={!stripe || isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Confirmer et déverrouiller
                </>
              )}
            </Button>
          </DialogFooter>
        </>
      )}
    </form>
  );
};

const RentPowerBank: React.FC<RentPowerBankProps> = ({ stationId, availablePowerBanks, onSuccess }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{ clientSecret: string; rentalId: string } | null>(null);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'qr'>('card');
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleRentClick = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour louer une powerbank');
      navigate('/auth/login?redirect=/stations');
      return;
    }

    setIsDialogOpen(true);
  };

  const handleStartRental = async () => {
    if (availablePowerBanks <= 0) {
      toast.error('Aucune powerbank disponible dans cette station');
      setIsDialogOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      // Dans un scénario réel, vous récupéreriez l'ID d'une powerbank spécifique
      const powerBankId = `power_bank_${Math.floor(Math.random() * 1000)}`;
      
      const result = await startRentalWithPreAuth({
        powerBankId,
        stationId,
        maxAmount: MAX_RENTAL_AMOUNT
      });

      if (result.success) {
        setPaymentInfo({
          clientSecret: result.clientSecret,
          rentalId: result.rentalId
        });
      } else {
        toast.error('Erreur lors de la préparation de la location');
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue');
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setIsDialogOpen(false);
      setIsQRDialogOpen(false);
      navigate('/rentals');
    }, 2000);
  };

  const handleQRPaymentClick = () => {
    setIsDialogOpen(false);
    setIsQRDialogOpen(true);
  };

  return (
    <>
      <Button onClick={handleRentClick} disabled={availablePowerBanks <= 0 || authLoading}>
        {availablePowerBanks > 0 ? 'Louer une powerbank' : 'Aucune powerbank disponible'}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Louer une powerbank</DialogTitle>
            <DialogDescription>
              {paymentInfo ? 
                'Veuillez confirmer la pré-autorisation pour déverrouiller la powerbank.' : 
                'La location d\'une powerbank nécessite une pré-autorisation de paiement qui sera ajustée selon la durée d\'utilisation.'}
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Préparation de votre location...</p>
            </div>
          ) : paymentInfo ? (
            <Tabs defaultValue="card" value={activeTab} onValueChange={(value) => setActiveTab(value as 'card' | 'qr')}>
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
                <Elements 
                  stripe={stripePromise} 
                  options={{
                    clientSecret: paymentInfo.clientSecret,
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
                    clientSecret={paymentInfo.clientSecret} 
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setIsDialogOpen(false)}
                  />
                </Elements>
              </TabsContent>
              
              <TabsContent value="qr" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pré-autorisation</span>
                      <span className="font-medium">{MAX_RENTAL_AMOUNT.toFixed(2)} CHF</span>
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
                    <Button onClick={handleQRPaymentClick}>
                      Générer un QR code
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Pré-autorisation</span>
                    <span>{MAX_RENTAL_AMOUNT.toFixed(2)} CHF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tarif horaire</span>
                    <span>2.00 CHF / heure</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Comment ça fonctionne :</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Une pré-autorisation de {MAX_RENTAL_AMOUNT.toFixed(2)} CHF est effectuée sur votre carte.</li>
                    <li>Ce montant n'est pas débité immédiatement.</li>
                    <li>À la restitution, seule la durée réelle d'utilisation vous sera facturée.</li>
                    <li>La différence vous sera remboursée automatiquement.</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-md flex items-center gap-3 text-sm">
                  <ShieldCheck className="text-blue-600 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800">Garantie limitée</p>
                    <p className="text-blue-700">Les powerbanks sont garanties 12 mois dans le cadre d'une utilisation normale.</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleStartRental}>
                  Continuer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <QRPaymentDialog
        isOpen={isQRDialogOpen}
        onClose={() => setIsQRDialogOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={MAX_RENTAL_AMOUNT}
        description="Pré-autorisation pour location de powerbank"
        metadata={{ rentalId: paymentInfo?.rentalId }}
      />
    </>
  );
};

export default RentPowerBank;
