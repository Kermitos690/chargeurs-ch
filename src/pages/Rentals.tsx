
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserRentals, getStations } from '@/services/api';
import { completeRental, calculateRentalCost, formatCurrency } from '@/services/rentalPayment';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Battery, MapPin, Clock, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';

const Rentals = () => {
  // Mock user ID for demo - would come from auth in a real app
  const userId = "user123";
  const navigate = useNavigate();
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: rentalsData, isLoading: rentalsLoading, error: rentalsError, refetch } = useQuery({
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

  // New helper function to extract hours as number for cost calculation
  const getHoursFromDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60)); // Return hours as number, rounded up
  };

  const handleReturnPowerBank = (rental) => {
    setSelectedRental(rental);
    setIsReturnDialogOpen(true);
  };

  const handleConfirmReturn = async () => {
    if (!selectedRental) return;
    
    setIsProcessing(true);
    
    try {
      // Pour la démonstration, nous utilisons une station fixe comme point de retour
      // Dans une application réelle, cela serait déterminé par la borne où la powerbank est rendue
      const endStationId = "station002"; 
      
      // Calculer le montant final à facturer en fonction de la durée
      const finalAmount = getHoursFromDuration(selectedRental.startTime) * 2;
      
      const result = await completeRental({
        rentalId: selectedRental.id,
        endStationId: endStationId,
        finalAmount: finalAmount
      });
      
      if (result.success) {
        toast.success('Powerbank restituée avec succès');
        setIsReturnDialogOpen(false);
        refetch(); // Rafraîchir les données
      } else {
        toast.error('Erreur lors de la restitution: ' + (result.error || 'Veuillez réessayer'));
      }
    } catch (error) {
      console.error('Erreur lors de la restitution:', error);
      toast.error('Une erreur est survenue lors de la restitution');
    } finally {
      setIsProcessing(false);
    }
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
              
              {rentalsData && (
                <>
                  {rentalsData.data && rentalsData.data.filter(rental => rental.status === 'active').length > 0 ? (
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
                                <div className="flex justify-between items-center mt-2 p-3 bg-primary/5 rounded-md">
                                  <div>
                                    <p className="text-sm font-medium text-primary">Pré-autorisation</p>
                                    <p className="font-medium">{formatCurrency(rental.maxAmount || 30)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-primary">Coût actuel</p>
                                    <p className="font-medium">{formatCurrency(calculateRentalCost(rental.startTime))}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/30 flex justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CreditCard size={16} className="mr-1" />
                                Facturation à la restitution
                              </div>
                              <Button onClick={() => handleReturnPowerBank(rental)}>
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
                        onClick={() => window.location.href = '/stations'}
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
              
              {rentalsData && (
                <>
                  {rentalsData.data && rentalsData.data.filter(rental => rental.status === 'completed').length > 0 ? (
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
                                {rental.finalAmount ? `${rental.finalAmount.toFixed(2)} CHF` : (rental.cost ? `${rental.cost.toFixed(2)} CHF` : '-')}
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
      
      {/* Dialogue de confirmation de retour */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la restitution</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de restituer votre powerbank. 
              Le montant final sera calculé en fonction de la durée de location.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRental && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Powerbank</span>
                  <span className="font-medium">#{selectedRental.powerBankId.slice(-4)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Durée</span>
                  <span className="font-medium">{calculateDuration(selectedRental.startTime)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Pré-autorisation</span>
                  <span className="font-medium">{formatCurrency(selectedRental.maxAmount || 30)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Montant total</span>
                  <span className="font-medium text-primary">{formatCurrency(calculateRentalCost(selectedRental.startTime))}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Le montant réellement facturé sera déduit de la pré-autorisation initiale. 
                La différence sera remboursée sur votre carte dans un délai de 5 à 7 jours ouvrables.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)} disabled={isProcessing}>
              Annuler
            </Button>
            <Button onClick={handleConfirmReturn} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Confirmer la restitution'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Rentals;
