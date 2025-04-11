import { supabase } from '@/integrations/supabase/client';

// Format des prix
export const formatCurrency = (amount: number, locale = 'fr-CH', currency = 'CHF') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Calcul des frais de location
export const calculateRentalFees = (startTime: string, endTime?: string) => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  
  // Calcul de la durée en heures (arrondi à l'heure supérieure)
  const durationMs = end.getTime() - start.getTime();
  const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
  
  // Tarification:
  // - 2 CHF pour la première heure
  // - 1 CHF par heure supplémentaire
  // - Maximum de 10 CHF par jour
  
  const initialCost = 2; // 2 CHF pour la première heure
  const hourlyRate = 1;   // 1 CHF par heure supplémentaire
  const dailyCap = 10;    // Plafond journalier
  
  // Calcul basique
  let totalAmount = initialCost;
  if (durationHours > 1) {
    totalAmount += Math.min(
      (durationHours - 1) * hourlyRate,
      Math.ceil(durationHours / 24) * dailyCap - initialCost
    );
  }
  
  // Application du plafond journalier
  totalAmount = Math.min(
    totalAmount,
    Math.ceil(durationHours / 24) * dailyCap
  );
  
  // Generate a breakdown text for display
  const breakdown = `
- Première heure: ${formatCurrency(initialCost)}
- ${durationHours > 1 ? `${durationHours - 1} heure(s) supplémentaire(s) à ${formatCurrency(hourlyRate)}/h: ${formatCurrency((durationHours - 1) * hourlyRate)}` : 'Pas d\'heures supplémentaires'}
- Plafond journalier: ${formatCurrency(dailyCap)} par jour
- Total calculé: ${formatCurrency(totalAmount)}
  `.trim();
  
  return { durationHours, totalAmount, breakdown };
};

// Rename these functions to match the imports in QRPaymentDialog
export const createQRPaymentSession = async ({ amount, description, expiresIn = 120, metadata = {} }) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-qr-payment', {
      body: { amount, description, expiresIn, metadata }
    });

    if (error) throw error;
    
    return { 
      success: true, 
      qrCodeUrl: data.qrCodeUrl,
      sessionId: data.sessionId,
      testMode: data.testMode
    };
  } catch (error: any) {
    console.error('Erreur lors de la création de la session QR:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la création de la session QR' 
    };
  }
};

export const checkQRPaymentStatus = async (sessionId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('check-payment-status', {
      body: { paymentId: sessionId }
    });

    if (error) throw error;
    
    return { 
      success: true, 
      status: data.status,
      paymentDetails: data.paymentDetails
    };
  } catch (error: any) {
    console.error('Erreur lors de la vérification du statut de paiement:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de la vérification du paiement' 
    };
  }
};

export const cancelQRPaymentSession = async (sessionId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('cancel-qr-payment', {
      body: { paymentId: sessionId }
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Erreur lors de l\'annulation de la session QR:', error);
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de l\'annulation de la session' 
    };
  }
};

// Keep the old function names as aliases for backward compatibility
export const createQrPayment = createQRPaymentSession;
export const getPaymentStatus = checkQRPaymentStatus;
export const cancelQrPayment = cancelQRPaymentSession;
