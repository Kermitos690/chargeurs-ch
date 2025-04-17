
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DialogFooter } from "@/components/ui/dialog";

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
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

export default PaymentForm;
