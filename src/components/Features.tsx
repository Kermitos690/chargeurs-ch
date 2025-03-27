
import React from 'react';
import { cn } from "@/lib/utils";
import { Zap, Shield, Clock, Wifi } from 'lucide-react';

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
      title: "Recharge rapide",
      description: "Jusqu'à 80% de batterie en moins de 30 minutes avec nos bornes de recharge rapide.",
      icon: <Zap className="w-6 h-6" />,
      delay: 100
    },
    {
      title: "Sécurité avancée",
      description: "Systèmes de sécurité intégrés pour protéger votre véhicule et vos données pendant la recharge.",
      icon: <Shield className="w-6 h-6" />,
      delay: 200
    },
    {
      title: "Disponibilité 24/7",
      description: "Accédez à nos stations de recharge à tout moment, jour et nuit, pour une flexibilité maximale.",
      icon: <Clock className="w-6 h-6" />,
      delay: 300
    },
    {
      title: "Connectivité intelligente",
      description: "Pilotez et surveillez vos sessions de recharge à distance via notre application mobile.",
      icon: <Wifi className="w-6 h-6" />,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions de recharge innovantes</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos technologies de pointe qui révolutionnent la recharge des véhicules électriques.
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
              <h3 className="text-2xl font-semibold mb-4">Des solutions pour tous</h3>
              <p className="text-muted-foreground mb-6">
                Que vous soyez un particulier cherchant à installer une borne de recharge à domicile ou une entreprise souhaitant équiper son parking, nous avons la solution adaptée à vos besoins.
              </p>
              <ul className="space-y-2">
                {[
                  "Installation résidentielle",
                  "Solutions pour entreprises",
                  "Réseaux de recharge publics",
                  "Maintenance et support technique"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20 p-6">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MDM1OTcyOA&ixlib=rb-1.2.1&q=80&w=900"
                  alt="Interface de gestion de recharge" 
                  className="rounded-xl shadow-subtle w-full h-auto transform transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary text-white p-3 rounded-xl shadow-elevation">
                <div className="text-sm font-medium">Application mobile</div>
                <div className="text-xs text-white/80">Contrôle en temps réel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
