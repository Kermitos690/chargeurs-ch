
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { getUserProfile, UserProfile } from '@/services/supabase/profile';
import { getDocument } from '@/services/firebase';
import { Subscription } from '@/types/api';

// Import the new component files
import AccountOverview from '@/components/account/AccountOverview';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import ProfileCard from '@/components/account/ProfileCard';

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
            <AccountOverview 
              userData={userData} 
              userSubscription={userSubscription} 
              loadingSubscription={loadingSubscription} 
              user={user} 
            />
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-4">
            <SubscriptionCard 
              userSubscription={userSubscription} 
              loadingSubscription={loadingSubscription} 
            />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileCard 
              userData={userData} 
              user={user} 
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
