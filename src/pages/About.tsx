
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">À Propos de Chargeurs.ch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous révolutionnons la façon dont les gens restent connectés en Suisse grâce à notre réseau de bornes de location de powerbanks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-muted-foreground mb-6">
                Chez Chargeurs.ch, notre mission est simple : éliminer l'anxiété liée à la batterie. Nous croyons que personne ne devrait jamais être à court d'énergie lorsqu'il est en déplacement.
              </p>
              <p className="text-muted-foreground mb-6">
                Nous avons créé un réseau de bornes de location de powerbanks dans toute la Suisse, permettant à nos utilisateurs d'emprunter une batterie portable lorsqu'ils en ont besoin et de la retourner lorsqu'ils ont terminé.
              </p>
              <p className="text-muted-foreground">
                Notre objectif est de construire l'infrastructure de recharge la plus accessible et la plus pratique pour la Suisse, en nous assurant que vous restez connecté, productif et prêt à affronter votre journée.
              </p>
            </div>
            <div className="glass-panel rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Personne utilisant une powerbank" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Notre Histoire</h2>
            <div className="relative border-l-2 border-primary pl-8 pb-8 ml-4">
              <div className="mb-10">
                <div className="absolute -left-4 mt-1.5 w-6 h-6 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-2">2021</h3>
                <p className="text-muted-foreground">Fondation de Chargeurs.ch avec une vision d'un réseau de recharge partagé pour la Suisse.</p>
              </div>
              <div className="mb-10">
                <div className="absolute -left-4 mt-1.5 w-6 h-6 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-2">2022</h3>
                <p className="text-muted-foreground">Lancement de nos premières bornes de location dans les principales villes suisses.</p>
              </div>
              <div className="mb-10">
                <div className="absolute -left-4 mt-1.5 w-6 h-6 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-2">2023</h3>
                <p className="text-muted-foreground">Expansion dans plus de 50 emplacements à travers la Suisse et lancement de notre application mobile.</p>
              </div>
              <div>
                <div className="absolute -left-4 mt-1.5 w-6 h-6 rounded-full bg-primary"></div>
                <h3 className="text-xl font-semibold mb-2">2024</h3>
                <p className="text-muted-foreground">Poursuite de notre croissance avec plus de 100 bornes et introduction de notre programme d'abonnement premium.</p>
              </div>
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Sophie Dubois', role: 'Fondatrice & CEO', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
                { name: 'Marc Keller', role: 'Directeur Technique', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
                { name: 'Lucie Martin', role: 'Responsable Marketing', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
              ].map((member, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
                  <div className="mb-4 mx-auto rounded-full overflow-hidden w-24 h-24">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Rejoignez-nous</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Nous sommes toujours à la recherche de talents passionnés pour nous aider à développer notre réseau et améliorer notre service.
            </p>
            <Button size="lg" className="rounded-full">
              Voir nos offres d'emploi
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
