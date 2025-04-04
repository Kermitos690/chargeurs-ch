
import React from 'react';
import { Station } from '@/types/api';
import { MapPin, BatteryMedium, AlertCircle } from 'lucide-react';

interface StationsListProps {
  isLoading: boolean;
  error: unknown;
  filteredStations: Station[];
  selectedStation: string | null;
  setSelectedStation: (id: string) => void;
}

const StationsList: React.FC<StationsListProps> = ({
  isLoading,
  error,
  filteredStations,
  selectedStation,
  setSelectedStation
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

  if (filteredStations.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Aucune borne ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      {filteredStations.map((station) => (
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
                ? 'bg-green-100 text-green-800' 
                : station.status === 'offline'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {station.status === 'online' ? 'En ligne' : station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
            <MapPin size={14} />
            {station.location}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BatteryMedium size={16} />
            <span>
              <span className="font-medium">{station.availablePowerBanks}</span>/{station.totalSlots} powerbanks disponibles
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationsList;
