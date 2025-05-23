
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, CreditCard, Clock, User, Package, BadgeCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Subscription {
  id?: string;
  name: string;
  description?: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  priceId?: string;
}

const Account = () => {
  const { user, loading, userData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      if (user) {
        setLoadingSubscription(true);
        try {
          // Récupérer les données utilisateur complètes
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError) throw profileError;
          
          setUserProfileData(profileData);
          
          // Si l'utilisateur a un abonnement, simuler les détails d'abonnement
          // Remarque: ceci est temporaire jusqu'à ce qu'une table d'abonnements soit créée
          if (profileData.subscription_type) {
            // Créer un mock de données d'abonnement basé sur le type
            let subscriptionData: Subscription;
            
            switch(profileData.subscription_type) {
              case 'premium':
                subscriptionData = {
                  name: 'Premium',
                  price: 9.99,
                  duration: 'monthly',
                  features: ['Locations illimitées', 'Support prioritaire', 'Réductions sur les produits']
                };
                break;
              case 'business':
                subscriptionData = {
                  name: 'Business',
                  price: 19.99,
                  duration: 'monthly',
                  features: ['Accès pour 5 utilisateurs', 'Support dédié', 'API access']
                };
                break;
              default:
                subscriptionData = {
                  name: 'Basic',
                  price: 0,
                  duration: 'monthly',
                  features: ['3 locations par mois', 'Support standard']
                };
            }
            
            setUserSubscription(subscriptionData);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données d\'abonnement:', error);
          toast({
            title: 'Erreur',
            description: 'Impossible de charger les informations d\'abonnement.',
            variant: 'destructive',
          });
        } finally {
          setLoadingSubscription(false);
        }
      }
    };

    fetchUserSubscription();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Calculer le nom d'affichage
  const displayName = userData?.name || user?.email?.split('@')[0] || 'Utilisateur';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Mon compte</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="subscription">Abonnement</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenue, {displayName}</CardTitle>
                <CardDescription>Gérez votre compte et vos services</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Abonnement</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {loadingSubscription ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Chargement...</span>
                      </div>
                    ) : userSubscription ? (
                      <>
                        <p className="text-xl font-bold">{userSubscription.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Renouvellement: {userSubscription.duration === 'monthly' ? 'Mensuel' : 'Annuel'}
                        </p>
                      </>
                    ) : (
                      <p>Aucun abonnement actif</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Factures récentes</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">+2350</p>
                    <p className="text-xs text-muted-foreground">
                      Chiffre d'affaires réalisé
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Crédit disponible
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">+29%</p>
                    <p className="text-xs text-muted-foreground">
                      Depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Dernière connexion
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">Il y a 2 jours</p>
                    <p className="text-xs text-muted-foreground">
                      10:23:03
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profile</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{user?.email}</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-4">
            {loadingSubscription ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Chargement des informations d'abonnement...</span>
              </div>
            ) : userSubscription ? (
              <Card>
                <CardHeader>
                  <CardTitle>Votre Abonnement</CardTitle>
                  <CardDescription>
                    Détails et statut de votre abonnement actuel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Plan</span>
                    <span>{userSubscription.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Tarif</span>
                    <span>{userSubscription.price} CHF / {userSubscription.duration === 'monthly' ? 'mois' : 'année'}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Fonctionnalités incluses:</h4>
                    <ul className="space-y-2">
                      {userSubscription.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <BadgeCheck className="h-4 w-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Changer de plan</Button>
                  <Button variant="destructive">Annuler l'abonnement</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Aucun abonnement actif</CardTitle>
                  <CardDescription>
                    Découvrez nos différentes formules d'abonnement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Vous n'avez pas encore souscrit à un abonnement. Découvrez nos offres pour profiter pleinement de nos services.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate('/subscriptions')}>
                    Voir les abonnements
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Modifiez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Nom d'utilisateur</h4>
                    <p className="text-gray-500">{displayName}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Email</h4>
                    <p className="text-gray-500">{user?.email || 'Non défini'}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Modifier le profil</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
