
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';

const About = () => {
  const benefits = [
    "Réseau de plus de 100 bornes dans toute la Suisse",
    "Powerbanks compatibles avec tous les smartphones et tablettes",
    "Service client disponible 7j/7",
    "Tarifs transparents sans frais cachés",
    "Application mobile intuitive",
    "Système de réservation de powerbank",
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h6 className="text-sm uppercase tracking-wider text-primary font-medium">À propos de nous</h6>
              <h2 className="text-3xl md:text-4xl font-bold">Experts en location de powerbanks</h2>
              <p className="text-muted-foreground text-lg">
                Chez chargeurs.ch, nous révolutionnons la façon dont vous gardez vos appareils chargés en déplacement. 
                Notre réseau de bornes de powerbanks vous permet d'emprunter une batterie externe quand vous en avez besoin 
                et de la rendre quand vous avez terminé, dans n'importe quelle borne de notre réseau.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="mt-1 rounded-full bg-primary/10 p-1 text-primary">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="bg-secondary/30 rounded-3xl p-6 md:p-10 border border-border/40 shadow-subtle">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/80">
                    <img 
                      src="https://images.unsplash.com/photo-1553434103-a7894caf8f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80" 
                      alt="Notre réseau de bornes de powerbanks" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-elevation border border-border/60 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-3xl font-bold text-primary">98%</div>
                        <div className="text-xs text-muted-foreground">Clients satisfaits</div>
                      </div>
                      <div className="h-10 w-px bg-border/60"></div>
                      <div>
                        <div className="text-3xl font-bold text-primary">5+</div>
                        <div className="text-xs text-muted-foreground">Années d'expérience</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info block */}
                <div className="mt-10 space-y-4">
                  <h3 className="text-xl font-semibold">Notre mission</h3>
                  <p className="text-muted-foreground">
                    Nous voulons mettre fin à l'angoisse de la batterie faible. Notre réseau de bornes de powerbanks vous permet 
                    de rester connecté sans vous soucier de votre niveau de batterie, où que vous soyez en Suisse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
