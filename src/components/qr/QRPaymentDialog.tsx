import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createQRPaymentSession, checkQRPaymentStatus } from '@/services/qrPayment';
import { Loader2, QrCode, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QRPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  description: string;
  metadata?: Record<string, any>;
}

const QRPaymentDialog: React.FC<QRPaymentDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description,
  metadata = {}
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [countdown, setCountdown] = useState<number | null>(null);
  const checkInterval = useRef<number | null>(null);
  const countdownInterval = useRef<number | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      createQRSession();
    }
    
    return () => {
      if (checkInterval.current) {
        window.clearInterval(checkInterval.current);
      }
      if (countdownInterval.current) {
        window.clearInterval(countdownInterval.current);
      }
    };
  }, [isOpen]);

  const createQRSession = async () => {
    setIsLoading(true);
    setError(null);
    setPaymentStatus('pending');
    
    try {
      const result = await createQRPaymentSession({
        amount,
        description,
        expiresIn: 300, // 5 minutes
        metadata
      });
      
      if (result.success) {
        setQrCodeUrl(result.qrCodeUrl);
        setSessionId(result.sessionId);
        setIsTestMode(result.testMode || false);
        
        if (checkInterval.current) {
          window.clearInterval(checkInterval.current);
        }
        
        checkInterval.current = window.setInterval(() => {
          if (sessionId) {
            checkPaymentStatus(sessionId);
          }
        }, 3000);
        
        const expiry = Math.floor(Date.now() / 1000) + 300; // 5 minutes
        setExpiresAt(expiry);
        setCountdown(300);
        
        if (countdownInterval.current) {
          window.clearInterval(countdownInterval.current);
        }
        
        countdownInterval.current = window.setInterval(() => {
          setCountdown(prev => {
            if (prev && prev > 0) {
              return prev - 1;
            } else {
              if (countdownInterval.current) {
                window.clearInterval(countdownInterval.current);
              }
              return 0;
            }
          });
        }, 1000);
      } else {
        setError(result.error || 'Erreur lors de la création du QR code');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session QR:', error);
      setError('Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentSessionId: string) => {
    try {
      const result = await checkQRPaymentStatus(paymentSessionId);
      
      if (result.success) {
        if (result.status === 'paid' || result.status === 'complete') {
          setPaymentStatus('success');
          toast.success('Paiement confirmé !');
          
          if (checkInterval.current) {
            window.clearInterval(checkInterval.current);
          }
          if (countdownInterval.current) {
            window.clearInterval(countdownInterval.current);
          }
          
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
    }
  };

  const formatCountdown = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (checkInterval.current) {
      window.clearInterval(checkInterval.current);
    }
    if (countdownInterval.current) {
      window.clearInterval(countdownInterval.current);
    }
    
    onClose();
  };

  const handleRetry = () => {
    createQRSession();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paiement par QR code</DialogTitle>
          <DialogDescription>
            Scannez ce QR code avec votre téléphone pour effectuer le paiement.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="animate-spin h-16 w-16 text-primary mx-auto mb-4" />
              <p>Génération du QR code...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 space-y-4">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
              <p className="text-destructive font-medium">{error}</p>
              <Button onClick={handleRetry}>Réessayer</Button>
            </div>
          ) : paymentStatus === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <p className="text-green-700 font-medium">Paiement confirmé !</p>
            </div>
          ) : (
            <>
              {qrCodeUrl && (
                <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                  <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                </div>
              )}
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Expire dans: <span className="font-medium">{formatCountdown(countdown)}</span>
                </p>
                <p className="text-sm font-medium">
                  Montant: {amount.toFixed(2)} CHF
                </p>
              </div>
              
              {isTestMode && (
                <Alert variant="default" className="mt-4">
                  <AlertDescription className="text-sm">
                    Mode test activé. Utilisez la page de test Stripe pour simuler un paiement.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading || paymentStatus === 'success'}
          >
            Annuler
          </Button>
          
          {paymentStatus === 'pending' && !isLoading && (
            <Button onClick={handleRetry} variant="outline" className="gap-2">
              <QrCode className="h-4 w-4" />
              Générer un nouveau QR
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRPaymentDialog;
