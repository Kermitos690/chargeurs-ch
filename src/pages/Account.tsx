
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, getUserRentals } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Clock, BatteryFull, MapPin } from 'lucide-react';

// Mocking user ID (in a real app, this would come from authentication)
const MOCK_USER_ID = '123';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Account = () => {
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', MOCK_USER_ID],
    queryFn: () => getUserProfile(MOCK_USER_ID),
  });

  const { data: rentalsData, isLoading: isLoadingRentals } = useQuery({
    queryKey: ['rentals', MOCK_USER_ID],
    queryFn: () => getUserRentals(MOCK_USER_ID),
  });

  const isLoading = isLoadingUser || isLoadingRentals;
  const user = userData?.data;
  const rentals = rentalsData?.data || [];
  const activeRental = rentals.find(rental => rental.status === 'active');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mon Compte</h1>
            <p className="text-lg text-muted-foreground">
              Gérez vos informations personnelles et suivez vos locations de powerbanks.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <span className="ml-4">Chargement de votre profil...</span>
            </div>
          ) : !user ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Vous n'êtes pas connecté</h2>
              <p className="text-muted-foreground mb-6">Connectez-vous pour accéder à votre compte.</p>
              <Button size="lg">Se connecter</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-8 rounded-xl shadow-sm border border-border col-span-1">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Téléphone</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Locations totales</span>
                      <span className="font-medium">{user.rentalHistory?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Membre depuis</span>
                      <span className="font-medium">Janvier 2023</span>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <Button variant="outline" className="w-full">
                      Modifier mon profil
                    </Button>
                    <Button variant="outline" className="w-full">
                      Changer mon mot de passe
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  {activeRental && (
                    <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <BatteryFull className="mr-2 h-5 w-5 text-primary" />
                        Location en cours
                      </h2>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Début:</span>
                          </div>
                          <span>{formatDate(activeRental.startTime)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Station de départ:</span>
                          </div>
                          <span>Station #{activeRental.startStationId}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div className="flex items-center">
                            <BatteryFull className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Powerbank ID:</span>
                          </div>
                          <span>{activeRental.powerBankId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Coût actuel:</span>
                          </div>
                          <span className="text-lg font-semibold">5.50 CHF</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button className="w-full">Terminer la location</Button>
                      </div>
                    </div>
                  )}

                  <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4">Dernières locations</h2>
                    {rentals.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Vous n'avez pas encore effectué de location.</p>
                    ) : (
                      <div className="space-y-4">
                        {rentals
                          .filter(rental => rental.status !== 'active')
                          .slice(0, 5)
                          .map((rental) => (
                            <div key={rental.id} className="flex justify-between items-center p-4 bg-accent rounded-lg">
                              <div>
                                <p className="font-medium">Location #{rental.id.substring(0, 8)}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(rental.startTime)} - {rental.endTime ? formatDate(rental.endTime) : 'En cours'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{rental.cost ? `${rental.cost} CHF` : '-'}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  rental.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {rental.status === 'completed' ? 'Terminée' : 'Annulée'}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                    {rentals.length > 5 && (
                      <div className="mt-6 text-center">
                        <Button variant="outline">Voir toutes mes locations</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                  <h2 className="text-xl font-bold mb-4">Méthodes de paiement</h2>
                  <div className="flex items-center p-4 bg-accent rounded-lg mb-4">
                    <CreditCard className="mr-4 h-6 w-6" />
                    <div>
                      <p className="font-medium">Carte Visa se terminant par 4242</p>
                      <p className="text-sm text-muted-foreground">Expire: 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Ajouter une carte</Button>
                </div>

                <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                  <h2 className="text-xl font-bold mb-4">Stations favorites</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">Gare de Genève</p>
                        <p className="text-sm text-muted-foreground">4 bornes disponibles</p>
                      </div>
                      <Button size="sm" variant="ghost">Voir</Button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">Centre Commercial Balexert</p>
                        <p className="text-sm text-muted-foreground">2 bornes disponibles</p>
                      </div>
                      <Button size="sm" variant="ghost">Voir</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-4">Paramètres de notification</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Notifications par email</span>
                    <div className="w-12 h-6 bg-primary/20 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-primary rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Notifications SMS</span>
                    <div className="w-12 h-6 bg-primary/20 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alertes de location</span>
                    <div className="w-12 h-6 bg-primary/20 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-primary rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Notifications promotionnelles</span>
                    <div className="w-12 h-6 bg-primary/20 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
