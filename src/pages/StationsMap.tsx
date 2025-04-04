
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, BatteryMedium, AlertCircle } from 'lucide-react';
import LeafletMap from '@/components/LeafletMap';
import { Station } from '@/types/api';

// Fictional Lausanne bars with power bank stations
const mockStations: Station[] = [
  {
    id: '1',
    name: 'Le Sidewalk Café',
    location: 'Rue de Bourg 20, Lausanne',
    latitude: 46.51991,
    longitude: 6.63299,
    availablePowerBanks: 8,
    totalSlots: 10,
    status: 'online',
    description: 'Café branché avec terrasse',
    imageUrl: '/stations/sidewalk.jpg'
  },
  {
    id: '2',
    name: 'The Great Escape',
    location: 'Rue Madeleine 18, Lausanne',
    latitude: 46.52221,
    longitude: 6.63359,
    availablePowerBanks: 4,
    totalSlots: 8,
    status: 'online',
    description: 'Pub avec ambiance internationale',
    imageUrl: '/stations/great-escape.jpg'
  },
  {
    id: '3',
    name: 'Bleu Lézard',
    location: 'Rue Enning 10, Lausanne',
    latitude: 46.52301,
    longitude: 6.63547,
    availablePowerBanks: 2,
    totalSlots: 6,
    status: 'online',
    description: 'Bar et restaurant avec terrasse',
    imageUrl: '/stations/bleu-lezard.jpg'
  },
  {
    id: '4',
    name: 'Café du Grütli',
    location: 'Rue Mercerie 4, Lausanne',
    latitude: 46.52248,
    longitude: 6.63492,
    availablePowerBanks: 0,
    totalSlots: 6,
    status: 'maintenance',
    description: 'Café traditionnel suisse',
    imageUrl: '/stations/grutli.jpg'
  },
  {
    id: '5',
    name: 'Le Bourg',
    location: 'Rue de Bourg 51, Lausanne',
    latitude: 46.52110,
    longitude: 6.63430,
    availablePowerBanks: 5,
    totalSlots: 8,
    status: 'online',
    description: 'Salle de concert et bar',
    imageUrl: '/stations/le-bourg.jpg'
  },
  {
    id: '6',
    name: 'Café de l\'Évêché',
    location: 'Place de l\'Évêché 5, Lausanne',
    latitude: 46.52303,
    longitude: 6.63615,
    availablePowerBanks: 0,
    totalSlots: 4,
    status: 'offline',
    description: 'Café au coeur de la ville',
    imageUrl: '/stations/eveche.jpg'
  },
  {
    id: '7',
    name: 'Le Château',
    location: 'Place du Château 7, Lausanne',
    latitude: 46.52352,
    longitude: 6.63528,
    availablePowerBanks: 3,
    totalSlots: 6,
    status: 'online',
    description: 'Bar à vin avec vue',
    imageUrl: '/stations/chateau.jpg'
  },
  {
    id: '8',
    name: 'Ta Cave',
    location: 'Rue Centrale 5, Lausanne',
    latitude: 46.52128,
    longitude: 6.63225,
    availablePowerBanks: 6,
    totalSlots: 10,
    status: 'online',
    description: 'Bar à vins naturels',
    imageUrl: '/stations/ta-cave.jpg'
  }
];

const StationsMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // In a real app we would use the API, but for this demo we're using mock data
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
    initialData: {
      success: true,
      data: mockStations
    }
  });

  useEffect(() => {
    // Set map as loaded after a small delay to ensure proper rendering
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter stations based on the search query
    console.log("Searching for:", searchQuery);
  };

  const stations = apiData?.data || [];

  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un bar, un lieu..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      Rechercher
                    </Button>
                  </div>
                </form>
                
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">Bornes disponibles</h2>
                    {!isLoading && (
                      <p className="text-sm text-muted-foreground">
                        {filteredStations.length} résultats
                      </p>
                    )}
                  </div>
                  
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                      <p className="mt-2">Chargement des bornes...</p>
                    </div>
                  ) : error ? (
                    <div className="p-8 text-center text-destructive">
                      <AlertCircle className="h-10 w-10 mx-auto mb-2" />
                      <p>Une erreur est survenue lors du chargement des bornes.</p>
                    </div>
                  ) : (
                    <div className="max-h-[500px] overflow-y-auto">
                      {filteredStations.length > 0 ? (
                        filteredStations.map((station) => (
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
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          Aucune borne ne correspond à votre recherche.
                        </div>
                      )}
                    </div>
                  )}
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
                  
                  {selectedStation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-card border shadow-lg rounded-lg p-4 z-10">
                      {stations && (
                        (() => {
                          const station = stations.find(s => s.id === selectedStation);
                          if (!station) return null;
                          
                          return (
                            <>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold">{station.name}</h3>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedStation(null)}>
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
                            </>
                          );
                        })()
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</div>
                    <div>
                      <h3 className="font-medium mb-1">Trouvez une borne</h3>
                      <p className="text-muted-foreground">Localisez la borne la plus proche de vous sur la carte ou via la liste.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</div>
                    <div>
                      <h3 className="font-medium mb-1">Scannez le QR code</h3>
                      <p className="text-muted-foreground">Utilisez notre application mobile pour scanner le QR code sur la borne.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">3</div>
                    <div>
                      <h3 className="font-medium mb-1">Prenez votre powerbank</h3>
                      <p className="text-muted-foreground">La borne déverrouille automatiquement un slot, prenez votre powerbank.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">4</div>
                    <div>
                      <h3 className="font-medium mb-1">Retournez-la dans n'importe quelle borne</h3>
                      <p className="text-muted-foreground">Une fois terminé, vous pouvez retourner la powerbank dans n'importe quelle borne de notre réseau.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StationsMap;
