
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, CreditCard, Clock, User, Package, BadgeCheck, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { getUserProfile, UserProfile } from '@/services/supabase/profile';
import { getDocument, getCollection } from '@/services/firebase';
import { Subscription } from '@/types/api';

const Account = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setLoadingSubscription(true);
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserData(profile);
          }
          
          const userResult = await getDocument('users', user.uid);
          
          if (userResult.success && userResult.data) {
            const userDataFromFirestore = userResult.data;
            
            if (userDataFromFirestore.subscriptionType) {
              const subResult = await getDocument('subscriptions', userDataFromFirestore.subscriptionType);
              if (subResult.success && subResult.data) {
                setUserSubscription(subResult.data as Subscription);
              }
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
          toast({
            title: 'Erreur',
            description: 'Impossible de charger les informations utilisateur.',
            variant: 'destructive',
          });
        } finally {
          setLoadingSubscription(false);
        }
      }
    };

    fetchUserData();
  }, [user, toast]);

  const getSubscriptionBadge = (profile: UserProfile | null) => {
    if (!profile || !profile.subscriptionType) return null;
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${profile.subscriptionType === 'premium' ? 'bg-gold-100 text-gold-800' : 'bg-blue-100 text-blue-800'}`}>
        {profile.subscriptionType === 'premium' ? 'Premium' : 'Basique'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

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
                <CardTitle>Bienvenue, {user?.displayName || userData?.firstName || 'Utilisateur'}</CardTitle>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-primary flex items-center"
                      onClick={() => navigate('/profile')}
                    >
                      <Settings className="h-4 w-4 mr-1" /> Gérer le profil
                    </Button>
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
                  Consultez et modifiez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Nom</h4>
                    <p className="text-gray-500">{userData?.firstName || 'Non défini'} {userData?.lastName || ''}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Email</h4>
                    <p className="text-gray-500">{user?.email || 'Non défini'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Téléphone</h4>
                    <p className="text-gray-500">{userData?.phone || 'Non défini'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Adresse</h4>
                    <p className="text-gray-500">
                      {userData?.address ? (
                        <>
                          {userData.address}<br />
                          {userData.postalCode} {userData.city}
                        </>
                      ) : (
                        'Non définie'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/profile')}>Modifier le profil</Button>
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
