
import React from 'react';
import { Station } from '@/types/api';
import { MapPin, BatteryMedium, AlertCircle, Navigation } from 'lucide-react';
import { formatDistance } from '@/utils/geo';

interface StationsListProps {
  isLoading: boolean;
  error: unknown;
  filteredStations: Station[];
  selectedStation: string | null;
  setSelectedStation: (id: string) => void;
  userLocation: {latitude: number | null, longitude: number | null} | null;
  stationsWithDistance: Array<Station & {distance: number | null}>;
}

const StationsList: React.FC<StationsListProps> = ({
  isLoading,
  error,
  filteredStations,
  selectedStation,
  setSelectedStation,
  stationsWithDistance
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Chargement des bornes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        <AlertCircle className="h-10 w-10 mx-auto mb-2" />
        <p>Une erreur est survenue lors du chargement des bornes.</p>
      </div>
    );
  }

  if (stationsWithDistance.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Aucune borne ne correspond à votre recherche.
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
            selectedStation === station.id ? 'bg-primary/10' : ''
          }`}
          onClick={() => setSelectedStation(station.id)}
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
            {station.location}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <BatteryMedium size={16} />
              <span>
                <span className="font-medium">{station.availablePowerBanks}</span>/{station.totalSlots} powerbanks
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
