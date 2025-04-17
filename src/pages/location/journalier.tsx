
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, Clock, BatteryCharging } from 'lucide-react';
import { toast } from 'sonner';
import { startRentalWithPreAuth } from '@/services/rentalPayment';
import { useAuth } from '@/hooks/useAuth';

const JournalierPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRentClick = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour louer une powerbank');
      navigate('/auth/login?redirect=/location/journalier');
      return;
    }

    setLoading(true);

    try {
      // Determiner le stationId et powerBankId de la station la plus proche (fictif pour l'exemple)
      const stationId = 'station_123';
      const powerBankId = 'powerbank_456';
      const maxAmount = 10; // Maximum 10 CHF pour location journalière

      const result = await startRentalWithPreAuth({
        powerBankId,
        stationId,
        maxAmount
      });

      if (result.success) {
        toast.success('Préparation de votre location...');
        navigate('/rentals');
      } else {
        toast.error(result.error || 'Une erreur est survenue lors de la préparation de la location');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur inattendue est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Location Journalière</h1>
            
            <Card className="mb-8 border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Forfait Journalier</span>
                  <span className="text-xl text-primary">2,00 CHF/jour</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Notre forfait journalier est idéal pour une utilisation ponctuelle. Restez chargé où que vous soyez, sans engagement.
                </p>
                
                <h3 className="font-semibold text-lg mb-2">Avantages</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Accès à toutes les stations de la ville</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Première heure à seulement 2 CHF</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Maximum 10 CHF pour une journée complète</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aucun engagement, payez uniquement ce que vous utilisez</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Échange illimité dans n'importe quelle station</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full mb-4" 
                  onClick={handleRentClick}
                  disabled={loading}
                >
                  {loading ? 'Traitement en cours...' : 'Louer maintenant'}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Une pré-autorisation de 10 CHF sera effectuée sur votre carte. 
                  Vous ne serez facturé que pour la durée réelle d'utilisation.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="bg-muted p-4 rounded-lg">
                <BatteryCharging className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Capacité optimale</h3>
                <p className="text-sm text-muted-foreground">
                  Nos powerbanks ont une capacité de 10 000 mAh, suffisante pour recharger votre téléphone plusieurs fois.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Rapide et efficace</h3>
                <p className="text-sm text-muted-foreground">
                  Charge rapide compatible avec la plupart des appareils récents (USB-C, Lightning, etc.).
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Partout en ville</h3>
                <p className="text-sm text-muted-foreground">
                  Plus de 500 stations stratégiquement situées dans les centres commerciaux, gares et lieux publics.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-4">Vous prévoyez d'utiliser nos services régulièrement ?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" onClick={() => navigate('/location/hebdomadaire')}>
                  Voir l'offre hebdomadaire
                </Button>
                <Button variant="outline" onClick={() => navigate('/location/mensuelle')}>
                  Voir l'offre mensuelle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JournalierPage;
