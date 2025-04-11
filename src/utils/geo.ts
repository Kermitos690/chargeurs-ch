
// Fonction pour calculer la distance entre deux coordonnées GPS
export const calculateDistance = (
  lat1: number | null | undefined,
  lon1: number | null | undefined,
  lat2: number | null | undefined,
  lon2: number | null | undefined
): number | null => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  
  // Conversion des degrés en radians
  const toRad = (degree: number) => degree * Math.PI / 180;
  
  // Formule de Haversine pour calculer la distance entre deux points sur une sphère
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance en km
  
  return distance;
};

// Formater la distance pour l'affichage
export const formatDistance = (distance: number | null): string => {
  if (distance === null) return 'Distance inconnue';
  
  if (distance < 1) {
    // Si moins de 1 km, convertir en mètres
    return `${Math.round(distance * 1000)} m`;
  } else {
    // Sinon afficher en km avec une décimale
    return `${distance.toFixed(1)} km`;
  }
};
