
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RentalPreAuthParams {
  powerBankId: string;
  stationId: string;
  maxAmount: number;
}

interface CompleteRentalParams {
  rentalId: string;
  endStationId: string;
  finalAmount: number;
}

// Fonction pour démarrer une location avec pré-autorisation
export const startRentalWithPreAuth = async ({ powerBankId, stationId, maxAmount }: RentalPreAuthParams) => {
  try {
    // Vérification de la session utilisateur
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'Vous devez être connecté pour louer une powerbank' };
    }
    
    // Création d'une pré-autorisation avec Stripe
    const { data, error } = await supabase.functions.invoke('create-rental-preauth', {
      body: {
        powerBankId,
        stationId,
        maxAmount,
        currency: 'chf'
      }
    });
    
    if (error) {
      console.error('Erreur lors de la création de la pré-autorisation:', error);
      return { success: false, error: error.message };
    }
    
    if (!data?.clientSecret) {
      return { success: false, error: 'Impossible de créer la pré-autorisation' };
    }
    
    // Création d'un enregistrement de location dans la base de données
    const { data: rentalData, error: rentalError } = await supabase
      .from('rentals')
      .insert({
        user_id: user.id,
        powerbank_id: powerBankId,
        start_station_id: stationId,
        cost: maxAmount, // Using cost instead of max_amount
        status: 'pending',
        stripe_setup_intent_id: data.setupIntentId
      })
      .select('id')
      .single();
    
    if (rentalError) {
      console.error('Erreur lors de l\'enregistrement de la location:', rentalError);
      return { success: false, error: 'Erreur lors de l\'enregistrement de la location' };
    }
    
    return { 
      success: true, 
      clientSecret: data.clientSecret,
      rentalId: rentalData.id
    };
  } catch (error) {
    console.error('Erreur lors du démarrage de la location:', error);
    return { success: false, error: 'Une erreur est survenue lors de la préparation de la location' };
  }
};

// Fonction pour compléter une location (retour de la powerbank)
export const completeRental = async ({ rentalId, endStationId, finalAmount }: CompleteRentalParams) => {
  try {
    // Récupération des informations de la location
    const { data: rental, error: rentalError } = await supabase
      .from('rentals')
      .select('*')
      .eq('id', rentalId)
      .single();
    
    if (rentalError || !rental) {
      throw new Error('Location introuvable');
    }
    
    if (rental.status !== 'active') {
      throw new Error('La location n\'est pas active');
    }
    
    // Capture du paiement final avec Stripe
    const { data, error } = await supabase.functions.invoke('capture-rental-payment', {
      body: {
        rentalId,
        // We don't have payment_method_id in the rentals table
        // Replace with a suitable alternative or remove if not needed
        finalAmount
      }
    });
    
    if (error) {
      console.error('Erreur lors de la capture du paiement:', error);
      return { success: false, error: error.message };
    }
    
    // Mise à jour de la location dans la base de données
    const { error: updateError } = await supabase
      .from('rentals')
      .update({
        status: 'completed',
        end_station_id: endStationId,
        end_time: new Date().toISOString(),
        cost: finalAmount // Use cost field instead of final_amount
      })
      .eq('id', rentalId);
    
    if (updateError) {
      console.error('Erreur lors de la mise à jour de la location:', updateError);
      return { success: false, error: 'Erreur lors de la mise à jour de la location' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la complétion de la location:', error);
    return { success: false, error: error.message };
  }
};

// Fonction pour vérifier l'état d'une location
export const checkRentalStatus = async (rentalId: string) => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('id', rentalId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { success: true, rental: data };
  } catch (error) {
    console.error('Erreur lors de la vérification de la location:', error);
    return { success: false, error: error.message };
  }
};
