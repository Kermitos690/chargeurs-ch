
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStations } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BatteryFull, MapPin, Clock, CreditCard, Star, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
  });

  const features = [
    {
      icon: <BatteryFull className="h-10 w-10 text-primary" />,
      title: "Rechargez n'importe où",
      description: "Accédez à nos bornes dans les bars et restaurants de Lausanne."
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Localisation facile",
      description: "Trouvez la borne la plus proche via notre application mobile."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Location flexible",
      description: "Louez pour une heure ou une journée entière selon vos besoins."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Paiement simplifié",
      description: "Payez uniquement pour le temps d'utilisation réel de la powerbank."
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Établissements premium",
      description: "Disponible dans les meilleurs bars et restaurants de Lausanne."
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Partenariats locaux",
      description: "Collaboration avec des établissements branchés de la région."
    }
  ];

  // Valeurs fictives pour la section partenaires
  const partnershipBenefits = [
    "Attirez une clientèle tech-friendly et branchée",
    "Générez des revenus supplémentaires grâce au système de commission",
    "Offrez un service additionnel très apprécié par les clients",
    "Aucun coût d'installation ou de maintenance",
    "Espace requis minimal pour la borne (25cm x 35cm)",
    "Visibilité accrue sur notre application et site web"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Solutions de Powerbanks</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre réseau de bornes de location de powerbanks, disponibles dans les bars et restaurants de Lausanne pour garder vos appareils chargés en permanence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-border"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Nos Établissements Partenaires</h2>
            
            {isLoading && (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4">Chargement des bornes...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-10 text-destructive">
                <p>Une erreur est survenue lors du chargement des bornes.</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  className="mt-4"
                >
                  Réessayer
                </Button>
              </div>
            )}
            
            {data?.success && data.data && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((station) => (
                  <div 
                    key={station.id}
                    className="bg-card p-6 rounded-lg shadow-sm border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-2">{station.name}</h3>
                    <p className="text-muted-foreground mb-1">{station.location}</p>
                    {station.description && (
                      <p className="text-muted-foreground text-sm mb-4 italic">"{station.description}"</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        station.status === 'online' 
                          ? 'bg-green-100 text-green-800' 
                          : station.status === 'offline'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {station.status === 'online' ? 'En ligne' : station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
                      </span>
                      <span className="text-sm">
                        {station.availablePowerBanks}/{station.totalSlots} powerbanks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {data?.success && (!data.data || data.data.length === 0) && (
              <div className="text-center py-10">
                <p>Aucune borne n'est disponible pour le moment.</p>
              </div>
            )}
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Devenez Partenaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Les avantages pour votre établissement</h3>
                <ul className="space-y-3">
                  {partnershipBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-6 rounded-full" asChild>
                  <Link to="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
              <div className="bg-muted p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4">Comment ça fonctionne ?</h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">1</span>
                    <span>Nous installons gratuitement une borne dans votre établissement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">2</span>
                    <span>Vos clients peuvent louer des powerbanks via notre application</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">3</span>
                    <span>Vous recevez une commission sur chaque location</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">4</span>
                    <span>Nous nous occupons de la maintenance et du support client</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Prêt à essayer ?</h2>
            <Button size="lg" className="rounded-full" asChild>
              <Link to="/stations">
                Trouver une borne
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
