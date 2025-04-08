
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile } from '@/services/firebase/profile';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserInfoForm, { ProfileFormValues } from '@/components/profile/UserInfoForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import NotificationsCard from '@/components/profile/NotificationsCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [profileFormValues, setProfileFormValues] = useState<ProfileFormValues>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  // Rediriger si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  // Charger les données du profil utilisateur
  useEffect(() => {
    const fetchUserProfileData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      try {
        // Utiliser d'abord les données de userData si disponibles
        if (userData) {
          setProfileData(userData);
          setProfileFormValues({
            name: userData.name || '',
            email: userData.email || user.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
            city: userData.city || '',
            postalCode: userData.postalCode || '',
          });
        }
        
        // Ensuite, récupérer les données complètes depuis Firestore
        const response = await getUserProfile(user.uid);
        if (response.success && response.data) {
          setProfileData(response.data);
          setProfileFormValues({
            name: response.data.name || user.displayName || '',
            email: response.data.email || user.email || '',
            phone: response.data.phone || '',
            address: response.data.address || '',
            city: response.data.city || '',
            postalCode: response.data.postalCode || '',
          });
        } else if (!response.success) {
          setError(response.error || "Erreur lors du chargement du profil");
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement du profil:', error);
        setError("Impossible de charger vos informations de profil.");
        toast({
          title: "Erreur",
          description: "Impossible de charger vos informations de profil.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfileData();
  }, [user, userData, toast]);

  if (loading || isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <ProfileHeader 
            title="Mon Profil" 
            subtitle="Gérez vos informations personnelles et de sécurité" 
          />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <UserInfoForm 
                userId={user?.uid} 
                initialValues={profileFormValues} 
              />
            </div>
            
            <div>
              <PasswordChangeForm />
              <NotificationsCard />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
