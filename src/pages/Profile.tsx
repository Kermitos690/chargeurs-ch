
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile } from '@/services/supabase/profile';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Import our new components
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import NotificationsSettings from '@/components/profile/NotificationsSettings';
import Loader from '@/components/ui/loader';

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setLoading(true);
        try {
          const profile = await getUserProfile(user.id);
          if (profile) {
            setUserData(profile);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les données du profil",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Loader message="Chargement de votre profil..." />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <Link to="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Retour à mon compte
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mon Profil</h1>
            <p className="text-lg text-muted-foreground">
              Gérez vos informations personnelles et de sécurité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PersonalInfoForm 
                userData={userData} 
                user={user || { id: '', email: '' }} 
              />
            </div>
            
            <div>
              <PasswordChangeForm userId={user?.id || ''} />
              
              <div className="mt-6">
                <NotificationsSettings />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
