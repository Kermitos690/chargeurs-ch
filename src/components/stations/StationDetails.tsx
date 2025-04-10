
import React from 'react';
import { Station } from '@/types/api';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistance } from '@/utils/geo';

interface StationDetailsProps {
  station: Station;
  onClose: () => void;
  userDistance: number | null;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station, onClose, userDistance }) => {
  if (!station) return null;
  
  const getDirectionsUrl = () => {
    if (!station.latitude || !station.longitude) return '#';
    return `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
  };
  
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-card border shadow-lg rounded-lg p-4 z-10">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{station.name || 'Station sans nom'}</h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          ×
        </Button>
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
        <MapPin size={14} />
        {station.location || 'Emplacement non disponible'}
      </p>
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Disponibilité</p>
          <p className="font-medium">{station.availablePowerBanks ?? 0}/{station.totalSlots ?? 0} powerbanks</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className={`font-medium ${
            station.status === 'online' ? 'text-green-600 dark:text-green-400' : 
            station.status === 'offline' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
          }`}>
            {station.status === 'online' ? 'En ligne' : 
             station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Distance</p>
          <p className="font-medium flex items-center gap-1">
            <Navigation size={14} />
            {formatDistance(userDistance)}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          size="sm" 
          onClick={() => window.open(getDirectionsUrl(), '_blank', 'noopener,noreferrer')}
        >
          Obtenir l'itinéraire
        </Button>
      </div>
    </div>
  );
};

export default StationDetails;
