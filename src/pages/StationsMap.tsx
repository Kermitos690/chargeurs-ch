
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, BatteryMedium, AlertCircle } from 'lucide-react';

const StationsMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter stations based on the search query
    console.log("Searching for:", searchQuery);
  };

  const filteredStations = data?.data?.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.location.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Bornes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Localisez toutes nos bornes de location de powerbanks près de chez vous.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une ville, un lieu..."
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
                  <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Carte des bornes</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Cette carte vous permet de visualiser toutes nos bornes de location de powerbanks.
                      Sélectionnez une borne pour voir plus d'informations.
                    </p>
                    <Button>Afficher ma position</Button>
                  </div>
                  
                  {selectedStation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-card border shadow-lg rounded-lg p-4 z-10">
                      {data?.data && (
                        (() => {
                          const station = data.data.find(s => s.id === selectedStation);
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
