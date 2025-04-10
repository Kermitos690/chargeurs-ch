
import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { 
  createQRPaymentSession, 
  checkQRPaymentStatus, 
  cancelQRPaymentSession 
} from '@/services/qrPayment';

interface QRPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sessionId: string) => void;
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
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes en secondes
  const statusCheckInterval = useRef<number | null>(null);
  const timerInterval = useRef<number | null>(null);

  // Génération du QR code lors de l'ouverture du dialogue
  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    } else {
      // Nettoyage lors de la fermeture
      cleanup();
    }
    
    return () => cleanup();
  }, [isOpen]);

  // Mise à jour du timer
  useEffect(() => {
    if (status === 'ready' && timeLeft > 0) {
      timerInterval.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval.current!);
            handleExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [status]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      setStatus('loading');
      
      // Créer la session de paiement QR Code
      const result = await createQRPaymentSession({
        amount,
        description,
        expiresIn: 120, // 2 minutes
        metadata
      });
      
      if (result.success && result.qrCodeUrl && result.sessionId) {
        setQrCodeUrl(result.qrCodeUrl);
        setSessionId(result.sessionId);
        setStatus('ready');
        setTimeLeft(120);
        
        // Démarrer la vérification du statut toutes les 2 secondes
        statusCheckInterval.current = window.setInterval(() => {
          checkStatus(result.sessionId!);
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Erreur lors de la génération du QR code');
        toast.error('Erreur lors de la génération du QR code');
      }
    } catch (error) {
      console.error('Erreur lors de la génération du QR code:', error);
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de la génération du QR code');
      toast.error('Erreur lors de la génération du QR code');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (sid: string) => {
    try {
      const result = await checkQRPaymentStatus(sid);
      
      if (result.success) {
        if (result.status === 'completed') {
          // Paiement réussi
          clearInterval(statusCheckInterval.current!);
          setStatus('success');
          toast.success('Paiement réussi !');
          
          // Appeler le callback de succès après un court délai
          setTimeout(() => {
            onSuccess(sid);
          }, 1500);
        } else if (result.status === 'expired' || result.status === 'canceled') {
          // Paiement expiré ou annulé
          clearInterval(statusCheckInterval.current!);
          setStatus('error');
          setErrorMessage(
            result.status === 'expired' 
              ? 'Le QR code a expiré. Veuillez réessayer.' 
              : 'Le paiement a été annulé.'
          );
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
    }
  };

  const handleExpired = async () => {
    if (sessionId) {
      try {
        clearInterval(statusCheckInterval.current!);
        setStatus('error');
        setErrorMessage('Le QR code a expiré. Veuillez réessayer.');
        
        // Annuler la session de paiement
        await cancelQRPaymentSession(sessionId);
      } catch (error) {
        console.error('Erreur lors de l\'annulation du paiement expiré:', error);
      }
    }
  };

  const handleClose = async () => {
    if (sessionId && status === 'ready') {
      try {
        // Annuler la session de paiement si on ferme manuellement
        await cancelQRPaymentSession(sessionId);
      } catch (error) {
        console.error('Erreur lors de l\'annulation du paiement:', error);
      }
    }
    
    cleanup();
    onClose();
  };

  const cleanup = () => {
    if (statusCheckInterval.current) clearInterval(statusCheckInterval.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    setQrCodeUrl(null);
    setSessionId(null);
    setStatus('loading');
    setErrorMessage(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {status === 'success' ? 'Paiement confirmé' : 'Scanner pour payer'}
          </DialogTitle>
          <DialogDescription>
            {status === 'success' 
              ? 'Votre paiement a été traité avec succès.'
              : status === 'error'
                ? 'Une erreur est survenue.'
                : `Scannez le QR code pour procéder au paiement de ${amount.toFixed(2)} CHF`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          {status === 'loading' && (
            <div className="flex flex-col items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-center">Génération du QR code de paiement...</p>
            </div>
          )}

          {status === 'ready' && qrCodeUrl && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code de paiement" 
                  className="w-64 h-64 object-contain"
                />
                <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                  <div className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-xs space-y-2">
                <Progress value={(timeLeft / 120) * 100} />
                <p className="text-sm text-center text-muted-foreground">
                  Scannez ce code avec votre téléphone pour procéder au paiement
                </p>
              </div>
              
              <div className="mt-4 bg-muted p-3 rounded-md w-full">
                <p className="font-medium text-center">{description}</p>
                <p className="text-center text-lg font-bold">{amount.toFixed(2)} CHF</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center py-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <p className="text-center text-lg font-medium mb-2">Paiement réussi !</p>
              <p className="text-center text-sm text-muted-foreground">
                Votre paiement de {amount.toFixed(2)} CHF a été traité avec succès.
              </p>
            </div>
          )}

          {status === 'error' && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage || 'Une erreur est survenue lors du paiement.'}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {status === 'ready' && (
            <p className="text-sm text-muted-foreground">
              Le QR code expire dans {formatTime(timeLeft)}
            </p>
          )}
          
          {status === 'success' ? (
            <Button onClick={handleClose} className="w-full">Fermer</Button>
          ) : status === 'error' ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Annuler
              </Button>
              <Button onClick={generateQRCode} className="flex-1">
                Réessayer
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRPaymentDialog;
