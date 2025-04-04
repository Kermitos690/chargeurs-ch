
import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryFull, MapPin, Clock, Shield, Smartphone, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: <BatteryFull className="h-12 w-12 text-primary" />,
      title: "Autonomie garantie",
      description: "Ne tombez plus jamais en panne de batterie. Nos powerbanks offrent une recharge rapide et efficace pour tous vos appareils."
    },
    {
      icon: <MapPin className="h-12 w-12 text-primary" />,
      title: "Réseau étendu",
      description: "Des bornes disponibles partout dans le canton de Vaud, accessibles 24h/24 et 7j/7."
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Utilisation flexible",
      description: "Location à la demande, sans engagement. Prenez une powerbank dans une borne et rendez-la dans une autre."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Sécurité optimale",
      description: "Bornes garanties 24 mois et powerbanks garanties 12 mois sous réserve d'une utilisation appropriée."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: "Application mobile",
      description: "Localisez les bornes, vérifiez la disponibilité et gérez vos locations depuis notre application."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Tarification transparente",
      description: "Payez uniquement pour la durée d'utilisation, sans frais cachés."
    }
  ];

  return (
    <section id="features" className="py-20 bg-accent/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir chargeurs.ch ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une solution pratique et écologique pour rester connecté à tout moment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all"
            >
              <div className="mb-5 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/stations">
              Trouver une borne près de chez vous
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
