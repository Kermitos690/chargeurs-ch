
import React from 'react';
import { Station } from '@/types/api';
import { MapPin, BatteryMedium, AlertCircle, Navigation } from 'lucide-react';
import { formatDistance } from '@/utils/geo';
import { StationsListProps } from '@/types';

const StationsList: React.FC<StationsListProps> = ({
  stationsList,
  selectedStationId,
  onSelect,
  userPosition
}) => {
  // Calculer la distance pour chaque station si la position utilisateur est disponible
  const stationsWithDistance = stationsList.map(station => {
    let distance = null;
    
    if (userPosition?.latitude && userPosition?.longitude && station.latitude && station.longitude) {
      // Calcul de la distance en utilisant la formule de Haversine
      const R = 6371; // Rayon de la Terre en km
      const lat1 = userPosition.latitude * Math.PI / 180;
      const lat2 = station.latitude * Math.PI / 180;
      const dLat = (station.latitude - userPosition.latitude) * Math.PI / 180;
      const dLon = (station.longitude - userPosition.longitude) * Math.PI / 180;
      
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      distance = R * c;
    }
    
    return { ...station, distance };
  });

  if (stationsList.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Aucune borne disponible.
      </div>
    );
  }

  // Trier les stations par distance si disponible
  const sortedStations = [...stationsWithDistance].sort((a, b) => {
    if (a.distance === null && b.distance === null) return 0;
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });

  return (
    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
      {sortedStations.map((station) => (
        <div 
          key={station.id}
          className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
            selectedStationId === station.id ? 'bg-primary/10' : ''
          }`}
          onClick={() => onSelect(station.id)}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">{station.name}</h3>
            <span className={`px-2 py-0.5 rounded text-xs ${
              station.status === 'online' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                : station.status === 'offline'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            }`}>
              {station.status === 'online' ? 'En ligne' : station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
            <MapPin size={14} />
            {station.location || station.address || 'Adresse non disponible'}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <BatteryMedium size={16} />
              <span>
                <span className="font-medium">{station.availablePowerBanks || 0}</span>/{station.totalSlots || 0} powerbanks
              </span>
            </div>
            {station.distance !== null && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Navigation size={12} />
                {formatDistance(station.distance)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationsList;
