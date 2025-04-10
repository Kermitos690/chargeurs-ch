
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeolocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: true
  });
  
  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
        isLoading: false
      }));
      return;
    }
    
    const successCallback = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        isLoading: false
      });
    };
    
    const errorCallback = (error: GeolocationPositionError) => {
      setState(prev => ({
        ...prev,
        error: getGeolocationErrorMessage(error),
        isLoading: false
      }));
    };
    
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options || defaultOptions
    );
    
    // Watch position pour mise à jour continue
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options || defaultOptions
    );
    
    return () => navigator.geolocation.clearWatch(watchId);
  }, [options]);
  
  return state;
};

// Fonction utilitaire pour obtenir des messages d'erreur lisibles
function getGeolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "L'accès à la géolocalisation a été refusé";
    case error.POSITION_UNAVAILABLE:
      return "Les informations de localisation ne sont pas disponibles";
    case error.TIMEOUT:
      return "La demande de localisation a expiré";
    default:
      return "Une erreur inconnue est survenue lors de la géolocalisation";
  }
}
