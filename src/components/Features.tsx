
import React from 'react';
import { cn } from "@/lib/utils";
import { Battery, MapPin, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => (
  <div 
    className="bg-white rounded-2xl p-6 shadow-subtle border border-border/60 transition-all duration-300 hover:shadow-elevation animate-fade-in hover:translate-y-[-2px]"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      title: "Batterie toujours chargée",
      description: "Plus jamais à court de batterie avec nos powerbanks de haute capacité toujours prêtes à l'emploi.",
      icon: <Battery className="w-6 h-6" />,
      delay: 100
    },
    {
      title: "Bornes partout",
      description: "Un réseau de bornes en constante expansion pour que vous puissiez emprunter et rendre une powerbank où vous voulez.",
      icon: <MapPin className="w-6 h-6" />,
      delay: 200
    },
    {
      title: "Location flexible",
      description: "Louez pour une heure ou une journée entière, la powerbank est à vous aussi longtemps que vous en avez besoin.",
      icon: <Clock className="w-6 h-6" />,
      delay: 300
    },
    {
      title: "Paiement simple",
      description: "Payez uniquement pour le temps d'utilisation réel de la powerbank, sans frais cachés ni engagement.",
      icon: <CreditCard className="w-6 h-6" />,
      delay: 400
    }
  ];

  return (
    <section id="features" className="py-24 bg-secondary/30 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h6 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">Nos services</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Location de Powerbanks Simplifiée</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez notre réseau de bornes de location de powerbanks, disponibles dans toute la Suisse.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
        
        <div className="mt-20 bg-white rounded-2xl shadow-elevation p-8 border border-border/40 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Pour tous vos besoins</h3>
              <p className="text-muted-foreground mb-6">
                Que vous soyez en déplacement, en voyage ou simplement dans une journée chargée, nos powerbanks vous accompagnent partout pour garder vos appareils chargés.
              </p>
              <ul className="space-y-2">
                {[
                  "Powerbanks haute capacité",
                  "Compatibles avec tous les appareils",
                  "Prêt et retour rapides",
                  "Support client 24/7"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link to="/features">
                  <button className="text-primary font-medium hover:underline transition-all">
                    En savoir plus →
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=600&q=80"
                  alt="Application de location de powerbank" 
                  className="rounded-xl shadow-subtle w-full h-auto transform transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary text-white p-3 rounded-xl shadow-elevation">
                <div className="text-sm font-medium">Application mobile</div>
                <div className="text-xs text-white/80">Localisation de bornes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
