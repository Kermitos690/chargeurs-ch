
import { supabase } from '@/integrations/supabase/client';

export interface QRPaymentParams {
  amount: number;
  description: string;
  expiresIn?: number;
  metadata?: Record<string, any>;
}

export interface QRPaymentResult {
  success: boolean;
  sessionId?: string;
  qrCodeUrl?: string;
  testMode?: boolean;
  error?: string;
}

export const createQRPaymentSession = async (params: QRPaymentParams): Promise<QRPaymentResult> => {
  try {
    // Obtenir l'utilisateur actuel
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'Utilisateur non authentifié' };
    }
    
    // Appeler l'Edge Function
    const { data, error } = await supabase.functions.invoke('create-qr-payment', {
      body: {
        userId: user.id,
        ...params
      }
    });
    
    if (error) {
      console.error('Erreur lors de la création du QR code:', error);
      return { success: false, error: error.message || 'Erreur lors de la création du QR code' };
    }
    
    // Vérifier la réponse
    if (!data.sessionId || !data.qrCodeUrl) {
      return { success: false, error: 'Réponse invalide du serveur' };
    }
    
    return { 
      success: true, 
      sessionId: data.sessionId, 
      qrCodeUrl: data.qrCodeUrl,
      testMode: data.testMode || false
    };
  } catch (error: any) {
    console.error('Erreur lors de la création du QR code:', error);
    return { success: false, error: error.message || 'Erreur inattendue' };
  }
};

export const checkQRPaymentStatus = async (sessionId: string): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-qr-payment-status', {
      body: { sessionId }
    });
    
    if (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      return { success: false, error: error.message || 'Erreur lors de la vérification du statut' };
    }
    
    return { success: true, ...data };
  } catch (error: any) {
    console.error('Erreur lors de la vérification du statut:', error);
    return { success: false, error: error.message || 'Erreur inattendue' };
  }
};

export const cancelQRPaymentSession = async (sessionId: string): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('cancel-qr-payment', {
      body: { sessionId }
    });
    
    if (error) {
      console.error('Erreur lors de l\'annulation de la session:', error);
      return { success: false, error: error.message || 'Erreur lors de l\'annulation de la session' };
    }
    
    return { success: true, ...data };
  } catch (error: any) {
    console.error('Erreur lors de l\'annulation de la session:', error);
    return { success: false, error: error.message || 'Erreur inattendue' };
  }
};

// Fonction utilitaire pour formater les montants
export const formatCurrency = (amount: number, locale = 'fr-CH', currency = 'CHF') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
