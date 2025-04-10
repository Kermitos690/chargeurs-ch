
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QRPaymentParams {
  amount: number;
  description: string;
  expiresIn?: number; // Durée de validité en secondes, par défaut 120 (2 min)
  metadata?: Record<string, any>;
}

interface QRPaymentResponse {
  success: boolean;
  qrCodeUrl?: string;
  sessionId?: string;
  testMode?: boolean;
  error?: string;
}

// Créer une session de paiement QR Code
export const createQRPaymentSession = async ({
  amount,
  description,
  expiresIn = 120, // 2 minutes par défaut
  metadata = {}
}: QRPaymentParams): Promise<QRPaymentResponse> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour effectuer cette opération');
      return { success: false, error: 'Non authentifié' };
    }
    
    // Appel à la fonction edge pour créer la session QR code
    const { data, error } = await supabase.functions.invoke('create-qr-payment', {
      body: {
        userId: user.id,
        amount,
        description,
        expiresIn,
        metadata
      }
    });
    
    if (error) {
      console.error('Erreur lors de la création du QR code de paiement:', error);
      toast.error('Impossible de générer le QR code de paiement');
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      qrCodeUrl: data.qrCodeUrl,
      sessionId: data.sessionId,
      testMode: data.testMode
    };
  } catch (error) {
    console.error('Erreur lors de la création du QR code de paiement:', error);
    toast.error('Une erreur est survenue lors de la génération du QR code');
    return { success: false, error: error.message };
  }
};

// Vérifier le statut d'une session de paiement QR Code
export const checkQRPaymentStatus = async (sessionId: string): Promise<{
  success: boolean;
  status?: 'pending' | 'completed' | 'expired' | 'canceled';
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-qr-payment-status', {
      body: { sessionId }
    });
    
    if (error) {
      console.error('Erreur lors de la vérification du statut du paiement:', error);
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      status: data.status
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du statut du paiement:', error);
    return { success: false, error: error.message };
  }
};

// Annuler une session de paiement QR Code
export const cancelQRPaymentSession = async (sessionId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke('cancel-qr-payment', {
      body: { sessionId }
    });
    
    if (error) {
      console.error('Erreur lors de l\'annulation du paiement:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'annulation du paiement:', error);
    return { success: false, error: error.message };
  }
};

// Format currency amounts to display with currency symbol
export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} CHF`;
};

// Calculer les frais de location en fonction de la durée
export const calculateRentalFees = (startTime: string, hourlyRate: number = 2): {
  totalHours: number;
  totalAmount: number;
  breakdown: string;
} => {
  const start = new Date(startTime);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  
  // Calculer les heures (arrondi à l'heure supérieure pour la facturation)
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const totalHours = Math.ceil(diffInHours);
  const totalAmount = totalHours * hourlyRate;
  
  // Créer une explication du calcul
  const breakdown = `
    Début de location: ${start.toLocaleString('fr-FR')}
    Durée: ${totalHours} heure(s) (${(diffInHours).toFixed(2)} heures exactes)
    Tarif horaire: ${hourlyRate.toFixed(2)} CHF/heure
    Total: ${totalHours} × ${hourlyRate.toFixed(2)} = ${totalAmount.toFixed(2)} CHF
  `;
  
  return {
    totalHours,
    totalAmount,
    breakdown
  };
};
