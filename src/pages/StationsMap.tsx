import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import LeafletMap from '@/components/LeafletMap';
import { mockStations } from '@/data/mockStations';
import StationSearch from '@/components/stations/StationSearch';
import StationsList from '@/components/stations/StationsList';
import StationDetails from '@/components/stations/StationDetails';
import HowItWorks from '@/components/stations/HowItWorks';
import { Station } from '@/types/api';
import { toast } from 'sonner';

const StationsMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
    initialData: {
      success: true,
      data: mockStations
    },
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    onError: () => {
      toast.error("Impossible de charger les stations. Veuillez réessayer plus tard.");
    }
  });

  const stations = apiData?.data || [];

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche effectuée:", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (stations.length > 0) {
      const filtered = stations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations([]);
    }
  }, [searchQuery, stations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const selectedStationData = selectedStation
    ? stations.find(s => s.id === selectedStation)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Bornes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Localisez toutes nos bornes de location de powerbanks dans les bars de Lausanne.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <StationSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  isLoading={isLoading}
                />
                
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">Bornes disponibles</h2>
                    {!isLoading && (
                      <p className="text-sm text-muted-foreground">
                        {filteredStations.length} résultats
                      </p>
                    )}
                  </div>
                  
                  <StationsList
                    isLoading={isLoading}
                    error={error}
                    filteredStations={filteredStations}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Card className="h-[600px] relative overflow-hidden">
                <CardContent className="p-0 h-full">
                  {!isMapLoaded ? (
                    <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                      <p className="mt-4">Chargement de la carte...</p>
                    </div>
                  ) : (
                    <LeafletMap 
                      stations={filteredStations}
                      selectedStation={selectedStation}
                      onStationSelect={setSelectedStation}
                      height="600px"
                    />
                  )}
                  
                  {selectedStation && selectedStationData && (
                    <StationDetails 
                      station={selectedStationData} 
                      onClose={() => setSelectedStation(null)} 
                    />
                  )}
                </CardContent>
              </Card>
              
              <HowItWorks />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StationsMap;
