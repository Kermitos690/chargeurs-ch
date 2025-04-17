
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryCharging, Check, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { startRentalWithPreAuth } from '@/services/rentalPayment';
import { useAuth } from '@/hooks/useAuth';

const LocationPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('journalier');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRentClick = async (planType: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour louer une powerbank');
      navigate('/auth/login?redirect=/location');
      return;
    }

    setLoading(true);

    try {
      // Determiner le stationId et powerBankId de la station la plus proche (fictif pour l'exemple)
      const stationId = 'station_123';
      const powerBankId = 'powerbank_456';
      const maxAmount = planType === 'journalier' ? 10 : planType === 'hebdomadaire' ? 35 : 120;

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

  const rentalOptions = [
    {
      id: 'journalier',
      title: 'Journalier',
      price: '2,00 CHF/jour',
      description: 'Location quotidienne idéale pour une utilisation ponctuelle',
      features: [
        'Accès à toutes les stations',
        'Premier jour à 2 CHF',
        'Maximum 10 CHF pour 24h',
        'Sans engagement'
      ]
    },
    {
      id: 'hebdomadaire',
      title: 'Hebdomadaire',
      price: '9,90 CHF/semaine',
      description: 'Location pour une semaine complète à prix réduit',
      features: [
        'Accès à toutes les stations',
        'Économisez par rapport au tarif journalier',
        'Maximum 35 CHF pour 7 jours',
        'Idéal pour les voyages'
      ]
    },
    {
      id: 'mensuel',
      title: 'Mensuel',
      price: '29,90 CHF/mois',
      description: 'Notre meilleure offre pour une utilisation régulière',
      features: [
        'Accès à toutes les stations',
        'Powerbank toujours disponible',
        'Échanges illimités',
        'Économies importantes sur le long terme'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-green-50 to-white py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Location de Powerbanks</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Une solution simple pour rester chargé partout où vous allez. Choisissez la formule qui vous convient.
              </p>
            </div>

            <Tabs defaultValue={selectedOption} onValueChange={setSelectedOption} className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {rentalOptions.map(option => (
                  <TabsTrigger key={option.id} value={option.id} className="text-sm sm:text-base">
                    {option.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {rentalOptions.map(option => (
                <TabsContent key={option.id} value={option.id} className="mt-0">
                  <Card className="border-t-4 border-t-primary">
                    <CardHeader>
                      <CardTitle className="text-2xl">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                      <div className="mt-4 text-3xl font-bold text-primary">
                        {option.price}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleRentClick(option.id)}
                        disabled={loading}
                      >
                        {loading ? 'Traitement en cours...' : 'Louer maintenant'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            <div className="max-w-4xl mx-auto mt-16 grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <BatteryCharging className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Toujours chargé</h3>
                <p className="text-muted-foreground text-sm">
                  Plus de 500 stations réparties dans toute la ville pour échanger votre powerbank à tout moment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Disponible 24/7</h3>
                <p className="text-muted-foreground text-sm">
                  Accédez à nos stations 24h/24 et 7j/7, pour une flexibilité totale selon vos besoins.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Facile à trouver</h3>
                <p className="text-muted-foreground text-sm">
                  Localisez la station la plus proche via notre application et obtenez des directions en temps réel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
