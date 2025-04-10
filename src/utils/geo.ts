
/**
 * Calcule la distance entre deux points géographiques en kilomètres
 * @param lat1 Latitude du premier point
 * @param lon1 Longitude du premier point
 * @param lat2 Latitude du second point
 * @param lon2 Longitude du second point
 * @returns Distance en kilomètres
 */
export function calculateDistance(
  lat1?: number | null, 
  lon1?: number | null, 
  lat2?: number | null, 
  lon2?: number | null
): number | null {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return null;
  }

  // Conversion des degrés en radians
  const toRad = (value: number) => value * Math.PI / 180;

  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  // Formule de Haversine
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c;
  
  return distance;
}

/**
 * Formate une distance en une chaîne lisible
 * @param distance Distance en kilomètres
 * @returns Chaîne formatée
 */
export function formatDistance(distance: number | null): string {
  if (distance === null) {
    return 'Distance inconnue';
  }
  
  if (distance < 1) {
    // Convertir en mètres si moins d'un kilomètre
    const meters = Math.round(distance * 1000);
    return `${meters} m`;
  }
  
  // Arrondir à une décimale pour les distances en kilomètres
  return `${distance.toFixed(1)} km`;
}
