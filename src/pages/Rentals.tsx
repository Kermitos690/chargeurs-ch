
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRentals } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

const Rentals = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['rentals'],
    queryFn: getRentals,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}min`;
    }
    return `${diffMins}min`;
  };

  // Filter rentals based on active tab
  const filteredRentals = data?.success && data.data 
    ? data.data.filter(rental => {
        if (activeTab === 'active') {
          return rental.status === 'active';
        } else if (activeTab === 'completed') {
          return rental.status === 'completed';
        }
        return true;
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mes Locations</h1>
            <p className="text-muted-foreground">
              Historique et détails de vos locations de powerbanks
            </p>
          </div>
          
          <Tabs defaultValue="active" onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="active">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
              <TabsTrigger value="all">Toutes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {renderRentalsList('active', filteredRentals, isLoading, error, formatDate, calculateDuration)}
            </TabsContent>
            
            <TabsContent value="completed">
              {renderRentalsList('completed', filteredRentals, isLoading, error, formatDate, calculateDuration)}
            </TabsContent>
            
            <TabsContent value="all">
              {renderRentalsList('all', filteredRentals, isLoading, error, formatDate, calculateDuration)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const renderRentalsList = (
  type: string,
  rentals: any[],
  isLoading: boolean,
  error: unknown,
  formatDate: (date: string) => string,
  calculateDuration: (start: string, end: string | null) => string
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5" />
        <div>
          <h3 className="font-medium">Erreur de chargement</h3>
          <p className="text-sm">Impossible de charger vos locations. Veuillez réessayer plus tard.</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }
  
  if (!rentals || rentals.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium mb-2">Aucune location {type === 'active' ? 'en cours' : type === 'completed' ? 'terminée' : ''}</h3>
        <p className="text-muted-foreground mb-4">
          {type === 'active' 
            ? "Vous n'avez pas de location de powerbank active pour le moment." 
            : "Votre historique de locations apparaîtra ici."}
        </p>
        <Button asChild>
          <a href="/stations">Trouver une borne</a>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {rentals.map((rental) => (
        <div key={rental.id} className="bg-card rounded-lg border p-5">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  rental.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
                }`}></span>
                <span className="font-medium">
                  Powerbank {rental.powerBankId} {' '}
                  <span className="text-muted-foreground font-normal">
                    ({rental.status === 'active' ? 'En cours' : 'Terminée'})
                  </span>
                </span>
              </div>
              
              <div className="flex flex-col gap-1 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Début: {formatDate(rental.startTime)}</span>
                </div>
                
                {rental.endTime && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Fin: {formatDate(rental.endTime)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Durée: {calculateDuration(rental.startTime, rental.endTime)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Borne: {rental.stationName}</span>
                </div>
              </div>
            </div>
            
            <div className="sm:text-right">
              <div className="font-medium">{rental.price ? `${rental.price} CHF` : 'Gratuit'}</div>
              
              {rental.status === 'active' && (
                <Button className="mt-4" variant="outline">
                  Terminer la location
                </Button>
              )}
              
              {rental.status === 'completed' && rental.receipt && (
                <Button className="mt-4" variant="outline" size="sm">
                  Voir le reçu
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rentals;
