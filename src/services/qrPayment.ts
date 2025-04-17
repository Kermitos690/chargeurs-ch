
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateQRPaymentParams {
  amount: number;
  description: string;
  expiresIn?: number; // en secondes
  metadata?: Record<string, any>;
}

export const createQRPaymentSession = async ({ 
  amount, 
  description, 
  expiresIn = 300, 
  metadata = {} 
}: CreateQRPaymentParams) => {
  try {
    // Appel à la fonction edge pour créer une session de paiement QR
    const { data, error } = await supabase.functions.invoke('create-qr-payment', {
      body: {
        amount,
        description,
        expiresIn,
        metadata
      }
    });
    
    if (error) {
      console.error('Erreur lors de la création de la session QR:', error);
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      qrCodeUrl: data.qrCodeUrl,
      sessionId: data.sessionId,
      testMode: data.testMode
    };
  } catch (error) {
    console.error('Erreur lors de la création de la session QR:', error);
    return { success: false, error: error.message };
  }
};

export const checkQRPaymentStatus = async (sessionId: string) => {
  try {
    // Appel à la fonction edge pour vérifier le statut d'un paiement QR
    const { data, error } = await supabase.functions.invoke('check-qr-payment-status', {
      body: {
        sessionId
      }
    });
    
    if (error) {
      console.error('Erreur lors de la vérification du statut QR:', error);
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      status: data.status,
      paymentDetails: data.paymentDetails
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du statut QR:', error);
    return { success: false, error: error.message };
  }
};

export const cancelQRPaymentSession = async (sessionId: string) => {
  try {
    // Appel à la fonction edge pour annuler une session de paiement QR
    const { data, error } = await supabase.functions.invoke('cancel-qr-payment', {
      body: {
        sessionId
      }
    });
    
    if (error) {
      console.error('Erreur lors de l\'annulation de la session QR:', error);
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      canceled: data.canceled
    };
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la session QR:', error);
    return { success: false, error: error.message };
  }
};

// Fonction de calcul des frais de location
export const calculateRentalFees = (startTime: string, hourlyRate: number = 2) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  
  // Calcul des heures de location (arrondi à l'heure supérieure)
  const hours = Math.ceil(diffInMs / (1000 * 60 * 60));
  const totalAmount = hours * hourlyRate;
  
  // Calcul détaillé pour affichage
  let breakdown = `Base horaire: ${hourlyRate.toFixed(2)} CHF/heure\n`;
  breakdown += `Durée: ${hours} heure(s)\n`;
  breakdown += `Total: ${totalAmount.toFixed(2)} CHF`;
  
  return { totalAmount, breakdown, hours };
};

// Fonction utilitaire pour formater les montants
export const formatCurrency = (amount: number) => {
  return amount.toFixed(2) + ' CHF';
};
