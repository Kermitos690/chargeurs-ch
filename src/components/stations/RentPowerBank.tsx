
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { startRentalWithPreAuth } from '@/services/rentalPayment';
import { useAuth } from '@/hooks/useAuth';
import QRPaymentDialog from '@/components/qr/QRPaymentDialog';
import RentalInfo from './rental/RentalInfo';
import RentalLoading from './rental/RentalLoading';
import PaymentOptions from './rental/PaymentOptions';

const MAX_RENTAL_AMOUNT = 30; // Montant maximum préautorisé en CHF

interface RentPowerBankProps {
  stationId: string;
  availablePowerBanks: number;
  onSuccess?: () => void;
}

const RentPowerBank: React.FC<RentPowerBankProps> = ({ stationId, availablePowerBanks, onSuccess }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{ clientSecret: string; rentalId: string } | null>(null);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
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
        toast.success('Préparation de votre location réussie');
      } else {
        toast.error(result.error || 'Une erreur est survenue lors de la préparation de la location');
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors de la communication avec le serveur');
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

  const handleCancelDialog = () => {
    setIsDialogOpen(false);
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
            <RentalLoading />
          ) : paymentInfo ? (
            <PaymentOptions
              clientSecret={paymentInfo.clientSecret}
              maxAmount={MAX_RENTAL_AMOUNT}
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancelDialog}
              onQRPaymentClick={handleQRPaymentClick}
            />
          ) : (
            <RentalInfo
              maxAmount={MAX_RENTAL_AMOUNT}
              onContinue={handleStartRental}
              onCancel={handleCancelDialog}
            />
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
