
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';

const About = () => {
  const benefits = [
    "Installation professionnelle par des experts certifiés",
    "Support technique 7j/7",
    "Garantie de 24 mois sur toutes nos bornes et 12 mois sur les powerbanks",
    "Prolongation de garantie à partir de 99.-",
    "Solutions personnalisées pour chaque besoin",
    "Mises à jour logicielles automatiques",
    "Compatibilité avec tous les smartphones modernes USB-C / Lightning / Micro-USB",
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
              <h2 className="text-3xl md:text-4xl font-bold">Experts en solutions de recharge portable</h2>
              <p className="text-muted-foreground text-lg">
                Chez chargeurs.ch, nous proposons des solutions de location de powerbanks innovantes et fiables. 
                Notre mission est de faciliter la vie mobile en fournissant des powerbanks accessibles et performantes 
                partout dans le canton de Vaud.
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
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MDM1OTcyOA&ixlib=rb-1.2.1&q=80&w=1200" 
                      alt="Notre engagement pour l'environnement" 
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
                        <div className="text-3xl font-bold text-primary">10+</div>
                        <div className="text-xs text-muted-foreground">Années d'expérience</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info block */}
                <div className="mt-10 space-y-4">
                  <h3 className="text-xl font-semibold">Notre engagement</h3>
                  <p className="text-muted-foreground">
                    Nous nous engageons à fournir des solutions de recharge portables durables et respectueuses de l'environnement, 
                    en utilisant les dernières technologies pour optimiser l'efficacité énergétique.
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
