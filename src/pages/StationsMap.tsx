
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '@/services/api';
import LeafletMap from '@/components/LeafletMap';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Loader2 } from 'lucide-react';
import StationSearch from '@/components/stations/StationSearch';
import StationsList from '@/components/stations/StationsList';

const StationsMap = () => {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const userPosition = latitude && longitude ? { latitude, longitude } : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
    initialData: {
      success: true,
      data: [],
      error: null
    }
  });

  const stations = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Chargement des stations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Erreur</h2>
          <p className="text-lg text-muted-foreground">Impossible de charger les stations.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto border-r border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Stations de recharge</h1>
          <StationSearch 
            stationsList={stations}
            onSelect={(id) => setSelectedStationId(id)}
          />
          <StationsList 
            stationsList={stations} 
            selectedStationId={selectedStationId}
            onSelect={(id) => setSelectedStationId(id)}
            userPosition={userPosition}
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 h-1/2 md:h-full">
        <LeafletMap 
          stations={stations}
          selectedStation={selectedStationId}
          onMarkerClick={(id) => setSelectedStationId(id)}
          userPosition={userPosition}
        />
      </div>
    </div>
  );
};

export default StationsMap;
