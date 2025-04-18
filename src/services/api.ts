
import { supabase } from '@/integrations/supabase/client';

// Fonction pour récupérer les locations d'un utilisateur
export const getUserRentals = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Formater les données pour correspondre à l'interface utilisée dans les composants
    const formattedData = data.map(rental => ({
      id: rental.id,
      powerBankId: rental.powerbank_id,
      startTime: rental.start_time,
      startStationId: rental.start_station_id,
      endStationId: rental.end_station_id,
      endTime: rental.end_time,
      status: rental.status,
      maxAmount: rental.cost, // Utiliser cost pour le champ maxAmount
      finalAmount: rental.cost, // Utiliser cost pour le champ finalAmount
      cost: rental.cost
    }));
    
    return { 
      success: true, 
      data: formattedData
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des locations:', error);
    return { 
      success: false, 
      error: error.message,
      data: []
    };
  }
};

// Fonction pour récupérer les stations
export const getStations = async () => {
  try {
    const { data, error } = await supabase
      .from('stations')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    // Formater les données pour correspondre à l'interface utilisée dans les composants
    return { 
      success: true, 
      data: data.map(station => ({
        id: station.id,
        name: station.name,
        address: station.address,
        latitude: station.latitude,
        longitude: station.longitude,
        // Setting default values for properties that don't exist in DB
        availablePowerBanks: 0, // Default value since it doesn't exist in DB
        totalSlots: 0, // Default value since it doesn't exist in DB
        status: station.status
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des stations:', error);
    return { 
      success: false, 
      error: error.message,
      data: []
    };
  }
};

// Fonction pour récupérer une station spécifique
export const getStation = async (stationId: string) => {
  try {
    const { data, error } = await supabase
      .from('stations')
      .select('*')
      .eq('id', stationId)
      .single();
    
    if (error) throw error;
    
    return { 
      success: true, 
      data: {
        id: data.id,
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        availablePowerBanks: 0, // Default value since it doesn't exist in DB
        totalSlots: 0, // Default value since it doesn't exist in DB
        status: data.status
      }
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la station:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
};

// Fonction pour récupérer les informations utilisateur
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return { 
      success: true, 
      data
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
};
