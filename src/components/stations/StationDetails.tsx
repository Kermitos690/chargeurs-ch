
import React from 'react';
import { Station } from '@/types/api';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StationDetailsProps {
  station: Station;
  onClose: () => void;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-card border shadow-lg rounded-lg p-4 z-10">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{station.name}</h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          ×
        </Button>
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
        <MapPin size={14} />
        {station.location}
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Disponibilité</p>
          <p className="font-medium">{station.availablePowerBanks}/{station.totalSlots} powerbanks</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className={`font-medium ${
            station.status === 'online' ? 'text-green-600' : 
            station.status === 'offline' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {station.status === 'online' ? 'En ligne' : 
             station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm">Obtenir l'itinéraire</Button>
      </div>
    </div>
  );
};

export default StationDetails;
