
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserRentals, getStations } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Battery, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Rentals = () => {
  // Mock user ID for demo - would come from auth in a real app
  const userId = "user123";

  const { data: rentalsData, isLoading: rentalsLoading, error: rentalsError } = useQuery({
    queryKey: ['rentals', userId],
    queryFn: () => getUserRentals(userId),
  });

  const { data: stationsData } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
  });

  // Helper to find station name by ID
  const getStationName = (stationId: string) => {
    if (!stationsData?.data) return "Station inconnue";
    const station = stationsData.data.find((s) => s.id === stationId);
    return station ? station.name : "Station inconnue";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diffInMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}min`;
  };

  const handleReturnPowerBank = () => {
    toast.info("Veuillez vous rendre à une borne pour retourner votre powerbank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mes Locations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gérez vos locations de powerbanks et consultez votre historique.
            </p>
          </div>

          <Tabs defaultValue="active" className="mb-16">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="active">Location Active</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              {rentalsLoading && (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="mt-4">Chargement de vos locations...</p>
                </div>
              )}
              
              {rentalsError && (
                <Card className="bg-destructive/10 border-destructive">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle size={20} />
                      Erreur
                    </CardTitle>
                    <CardDescription>
                      Une erreur est survenue lors du chargement de vos locations.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Réessayer
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {rentalsData?.success && rentalsData?.data && (
                <>
                  {rentalsData.data.filter(rental => rental.status === 'active').length > 0 ? (
                    <div className="grid gap-8">
                      {rentalsData.data
                        .filter(rental => rental.status === 'active')
                        .map((rental) => (
                          <Card key={rental.id} className="overflow-hidden">
                            <CardHeader className="bg-primary/10">
                              <CardTitle className="flex items-center gap-2">
                                <Battery size={20} />
                                Powerbank #{rental.powerBankId.slice(-4)}
                              </CardTitle>
                              <CardDescription>
                                Location active
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="grid gap-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Station de départ</p>
                                    <p className="flex items-center gap-1">
                                      <MapPin size={16} className="text-primary" />
                                      {getStationName(rental.startStationId)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-muted-foreground">Date de début</p>
                                    <p className="flex items-center gap-1 justify-end">
                                      <Clock size={16} className="text-primary" />
                                      {formatDate(rental.startTime)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Durée</p>
                                  <p className="font-medium text-lg">{calculateDuration(rental.startTime)}</p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/30 flex justify-between">
                              <p className="text-sm">
                                <span className="font-medium">Coût estimé:</span> {(calculateDuration(rental.startTime).split('h')[0] * 2).toFixed(2)} CHF
                              </p>
                              <Button onClick={handleReturnPowerBank}>
                                Retourner
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-muted/30 rounded-lg">
                      <p className="mb-4">Vous n'avez pas de location active.</p>
                      <Button 
                        onClick={() => window.location.href = '/features'}
                        className="rounded-full"
                      >
                        Trouver une borne
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              {rentalsLoading && (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="mt-4">Chargement de votre historique...</p>
                </div>
              )}
              
              {rentalsData?.success && rentalsData?.data && (
                <>
                  {rentalsData.data.filter(rental => rental.status === 'completed').length > 0 ? (
                    <div className="grid gap-4">
                      {rentalsData.data
                        .filter(rental => rental.status === 'completed')
                        .map((rental) => (
                          <Card key={rental.id} className="overflow-hidden">
                            <CardHeader className="py-4">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base flex items-center gap-1">
                                  <Battery size={18} />
                                  Powerbank #{rental.powerBankId.slice(-4)}
                                </CardTitle>
                                <span className="flex items-center text-xs gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  <CheckCircle size={12} />
                                  Terminée
                                </span>
                              </div>
                            </CardHeader>
                            <CardContent className="py-3">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Début</p>
                                  <p>{formatDate(rental.startTime)}</p>
                                  <p className="mt-1 text-primary">{getStationName(rental.startStationId)}</p>
                                </div>
                                {rental.endTime && (
                                  <div>
                                    <p className="text-muted-foreground">Fin</p>
                                    <p>{formatDate(rental.endTime)}</p>
                                    <p className="mt-1 text-primary">{rental.endStationId ? getStationName(rental.endStationId) : '-'}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t py-3 bg-muted/30 flex justify-between">
                              <p className="text-sm">
                                <span className="font-medium">Durée:</span> {rental.endTime ? calculateDuration(rental.startTime, rental.endTime) : '-'}
                              </p>
                              <p className="text-sm font-medium">
                                {rental.cost ? `${rental.cost.toFixed(2)} CHF` : '-'}
                              </p>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-muted/30 rounded-lg">
                      <p>Aucun historique de location disponible.</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rentals;
