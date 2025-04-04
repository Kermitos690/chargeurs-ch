
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StartRentalParams {
  powerBankId: string;
  stationId: string;
  maxAmount: number;
}

interface CompleteRentalParams {
  rentalId: string;
  endStationId: string;
  finalAmount: number;
}

export const startRentalWithPreAuth = async ({ powerBankId, stationId, maxAmount }: StartRentalParams) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour louer une powerbank');
      return { success: false, error: 'Non authentifié' };
    }
    
    // Appel à la fonction edge pour créer la pré-autorisation
    const { data, error } = await supabase.functions.invoke('create-rental-payment', {
      body: {
        userId: user.id,
        powerBankId,
        stationId,
        maxAmount
      }
    });
    
    if (error) {
      console.error('Erreur lors de la création de la pré-autorisation:', error);
      toast.error('Impossible de démarrer la location. Veuillez réessayer.');
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      setupIntentId: data.setupIntentId,
      clientSecret: data.clientSecret,
      rentalId: data.rentalId,
      rentalRef: data.rentalRef
    };
  } catch (error) {
    console.error('Erreur lors du démarrage de la location:', error);
    toast.error('Une erreur est survenue lors du démarrage de la location');
    return { success: false, error: error.message };
  }
};

export const completeRental = async ({ rentalId, endStationId, finalAmount }: CompleteRentalParams) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Vous devez être connecté pour finaliser une location');
      return { success: false, error: 'Non authentifié' };
    }
    
    // Appel à la fonction edge pour finaliser le paiement
    const { data, error } = await supabase.functions.invoke('update-rental-payment', {
      body: {
        rentalId,
        endStationId,
        finalAmount
      }
    });
    
    if (error) {
      console.error('Erreur lors de la finalisation du paiement:', error);
      toast.error('Impossible de finaliser la location. Veuillez contacter le support.');
      return { success: false, error: error.message };
    }
    
    if (data.alreadyProcessed) {
      toast.info('Cette location a déjà été finalisée');
      return { success: true, alreadyProcessed: true };
    }
    
    toast.success('Location terminée avec succès');
    return { 
      success: true, 
      paymentIntentId: data.paymentIntentId,
      amount: data.amount,
      rental: data.rental
    };
  } catch (error) {
    console.error('Erreur lors de la finalisation de la location:', error);
    toast.error('Une erreur est survenue lors de la finalisation de la location');
    return { success: false, error: error.message };
  }
};

// Fonction pour calculer le coût estimé d'une location en cours
export const calculateRentalCost = (startTime: string, hourlyRate: number = 2) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  const hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Arrondi à l'heure supérieure
  return hours * hourlyRate;
};

// Fonction utilitaire pour formater les montants
export const formatCurrency = (amount: number) => {
  return amount.toFixed(2) + ' CHF';
};
