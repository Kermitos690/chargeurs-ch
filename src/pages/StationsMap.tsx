
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
import { ThemeToggle } from '@/components/ThemeToggle';
import { useGeolocation } from '@/hooks/useGeolocation';
import { calculateDistance } from '@/utils/geo';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const StationsMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [useLocationFilter, setUseLocationFilter] = useState<boolean>(false);
  const [stationsWithDistance, setStationsWithDistance] = useState<Array<Station & {distance: number | null}>>([]);
  
  // Utilisation du hook de géolocalisation
  const { latitude, longitude, error: geoError, isLoading: geoLoading } = useGeolocation();
  const userLocation = latitude && longitude ? { latitude, longitude } : null;
  
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
    initialData: () => ({
      success: true,
      data: mockStations
    }),
    staleTime: 60000,
    gcTime: 300000,
    retry: 3,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast.error("Impossible de charger les stations. Veuillez réessayer plus tard.");
        }
      }
    }
  });

  // Handle errors outside of query options too
  useEffect(() => {
    if (error) {
      toast.error("Impossible de charger les stations. Veuillez réessayer plus tard.");
    }
    
    if (geoError && useLocationFilter) {
      toast.error(geoError);
    }
  }, [error, geoError, useLocationFilter]);

  const stations = apiData?.data || [];

  // Calcul des distances entre l'utilisateur et les stations
  useEffect(() => {
    if (stations.length > 0) {
      const stationsWithDistanceData = stations.map(station => {
        const distance = calculateDistance(
          userLocation?.latitude, 
          userLocation?.longitude, 
          station.latitude, 
          station.longitude
        );
        return { ...station, distance };
      });
      setStationsWithDistance(stationsWithDistanceData);
    } else {
      setStationsWithDistance([]);
    }
  }, [stations, userLocation]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche effectuée:", searchQuery);
  }, [searchQuery]);

  // Filtrer les stations en fonction de la recherche
  useEffect(() => {
    if (stations.length > 0) {
      let filtered = stations.filter(station => 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Si le filtre de localisation est activé et que l'utilisateur a une position
      if (useLocationFilter && userLocation) {
        filtered = filtered
          .map(station => {
            const distance = calculateDistance(
              userLocation.latitude, 
              userLocation.longitude, 
              station.latitude, 
              station.longitude
            );
            return { ...station, distance };
          })
          .filter(station => station.distance !== null && station.distance <= 5) // Stations dans un rayon de 5km
          .sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
          });
      }
      
      setFilteredStations(filtered);
    } else {
      setFilteredStations([]);
    }
  }, [searchQuery, stations, useLocationFilter, userLocation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const selectedStationData = selectedStation
    ? stations.find(s => s.id === selectedStation)
    : null;
    
  const selectedStationDistance = selectedStationData 
    ? calculateDistance(
        userLocation?.latitude, 
        userLocation?.longitude, 
        selectedStationData.latitude, 
        selectedStationData.longitude
      ) 
    : null;

  return (
    <div className="min-h-screen flex flex-col dark:bg-black dark:text-white transition-colors duration-300">
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
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="location-filter"
                      checked={useLocationFilter}
                      onCheckedChange={setUseLocationFilter}
                      disabled={!userLocation}
                    />
                    <Label htmlFor="location-filter">
                      Bornes à proximité
                    </Label>
                  </div>
                  <ThemeToggle />
                </div>
                
                <StationSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  isLoading={isLoading}
                />
                
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                  <div className="p-4 border-b dark:border-gray-800">
                    <h2 className="font-semibold">Bornes disponibles</h2>
                    {!isLoading && (
                      <p className="text-sm text-muted-foreground">
                        {filteredStations.length} résultats
                        {userLocation && useLocationFilter && " à proximité"}
                      </p>
                    )}
                  </div>
                  
                  <StationsList
                    isLoading={isLoading}
                    error={error}
                    filteredStations={filteredStations}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                    userLocation={userLocation}
                    stationsWithDistance={stationsWithDistance.filter(station => 
                      filteredStations.some(fs => fs.id === station.id)
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Card className="h-[600px] relative overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-0 h-full">
                  {!isMapLoaded ? (
                    <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center p-6 text-center dark:bg-gray-800/50">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                      <p className="mt-4">Chargement de la carte...</p>
                    </div>
                  ) : (
                    <LeafletMap 
                      stations={filteredStations}
                      selectedStation={selectedStation}
                      onStationSelect={setSelectedStation}
                      height="600px"
                      userLocation={userLocation}
                    />
                  )}
                  
                  {geoLoading && !userLocation && (
                    <div className="absolute top-4 right-4 bg-card p-2 rounded-md shadow-md z-10 dark:bg-gray-800 dark:text-white">
                      <p className="text-sm">Recherche de votre position...</p>
                    </div>
                  )}
                  
                  {selectedStation && selectedStationData && (
                    <StationDetails 
                      station={selectedStationData} 
                      onClose={() => setSelectedStation(null)} 
                      userDistance={selectedStationDistance}
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
