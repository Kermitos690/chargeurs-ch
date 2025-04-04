
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, CreditCard, Clock, Settings, BatteryMedium, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, getUserPayments } from '@/services/api';

const Account = () => {
  // Mock user ID for demo - would come from auth in a real app
  const userId = "user123";

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserProfile(userId),
  });

  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['payments', userId],
    queryFn: () => getUserPayments(userId),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const accountMenuItems = [
    {
      icon: <UserCircle className="h-5 w-5" />,
      title: "Mon Profil",
      description: "Gérer vos informations personnelles",
      link: "/profile"
    },
    {
      icon: <BatteryMedium className="h-5 w-5" />,
      title: "Mes Locations",
      description: "Consulter vos locations actives et historiques",
      link: "/rentals"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Mes Abonnements",
      description: "Gérer vos abonnements",
      link: "/subscriptions"
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Méthodes de paiement",
      description: "Gérer vos cartes et méthodes de paiement",
      link: "#payment-methods"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Historique de facturation",
      description: "Consulter vos factures et paiements",
      link: "#billing-history"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Paramètres",
      description: "Modifier les paramètres de votre compte",
      link: "#settings"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mon Compte</h1>
            <p className="text-lg text-muted-foreground">
              Gérez vos informations, abonnements et locations
            </p>
          </div>

          {userLoading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4">Chargement de vos informations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                      <UserCircle className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>
                      {userData?.data?.firstName} {userData?.data?.lastName}
                    </CardTitle>
                    <CardDescription>
                      {userData?.data?.email}
                      <p className="mt-1">Membre depuis {userData?.data?.createdAt ? formatDate(userData.data.createdAt) : 'N/A'}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to="/profile" className="w-full">
                      <Button variant="outline" className="w-full">
                        Modifier mon profil
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Mon abonnement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData?.data?.subscription ? (
                      <div>
                        <div className="bg-primary/10 px-3 py-1 rounded-full text-sm inline-block text-primary font-medium mb-2">
                          {userData.data.subscription.name}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Renouvellement le {userData.data.subscription.nextRenewal ? formatDate(userData.data.subscription.nextRenewal) : 'N/A'}
                        </p>
                        <ul className="space-y-2 text-sm">
                          {userData.data.subscription.features?.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-0.5 mt-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">Vous n'avez pas d'abonnement actif</p>
                        <Link to="/subscriptions">
                          <Button size="sm">Voir les abonnements</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="account">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Mon compte</TabsTrigger>
                    <TabsTrigger value="rentals">Locations</TabsTrigger>
                    <TabsTrigger value="payments">Paiements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {accountMenuItems.map((item, index) => (
                        <Link key={index} to={item.link} className="block">
                          <Card className="h-full hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                  {item.icon}
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{item.title}</CardTitle>
                                  <CardDescription>{item.description}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rentals" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vos dernières locations</CardTitle>
                        <CardDescription>Résumé de vos locations récentes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted py-2 px-4 text-sm font-medium grid grid-cols-4 gap-4">
                              <div>Powerbank</div>
                              <div>Date de début</div>
                              <div>Durée</div>
                              <div>Prix</div>
                            </div>
                            {[1, 2, 3].map((_, i) => (
                              <div key={i} className="py-3 px-4 grid grid-cols-4 gap-4 border-t">
                                <div>Powerbank #{(1000 + i).toString()}</div>
                                <div className="text-sm">{new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toLocaleDateString('fr-FR')}</div>
                                <div className="text-sm">{i + 1}h 30min</div>
                                <div className="text-sm">{((i + 1) * 2).toFixed(2)} CHF</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to="/rentals" className="w-full">
                          <Button variant="outline" className="w-full">
                            Voir toutes mes locations
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="payments" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Méthodes de paiement</CardTitle>
                        <CardDescription>Gérez vos cartes et méthodes de paiement</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Visa •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expire 04/25</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm">Supprimer</Button>
                            </div>
                          </div>
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Mastercard •••• 5678</p>
                                <p className="text-sm text-muted-foreground">Expire 08/26</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm">Supprimer</Button>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            Ajouter une carte
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Historique de paiements</CardTitle>
                        <CardDescription>Vos paiements récents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {paymentsLoading ? (
                          <div className="text-center py-10">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="border rounded-lg overflow-hidden">
                              <div className="bg-muted py-2 px-4 text-sm font-medium grid grid-cols-4 gap-4">
                                <div>Date</div>
                                <div>Description</div>
                                <div>Méthode</div>
                                <div>Montant</div>
                              </div>
                              {paymentsData?.data ? (
                                paymentsData.data.map((payment: any, i: number) => (
                                  <div key={i} className="py-3 px-4 grid grid-cols-4 gap-4 border-t">
                                    <div className="text-sm">{formatDate(payment.date)}</div>
                                    <div className="text-sm">{payment.description}</div>
                                    <div className="text-sm">{payment.method}</div>
                                    <div className="text-sm font-medium">{payment.amount} CHF</div>
                                  </div>
                                ))
                              ) : (
                                [1, 2, 3].map((_, i) => (
                                  <div key={i} className="py-3 px-4 grid grid-cols-4 gap-4 border-t">
                                    <div className="text-sm">{formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * i).toString())}</div>
                                    <div className="text-sm">{i === 0 ? "Abonnement Premium" : "Location Powerbank"}</div>
                                    <div className="text-sm">Visa •••• 4242</div>
                                    <div className="text-sm font-medium">{i === 0 ? "19.90" : ((i + 1) * 2).toFixed(2)} CHF</div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
