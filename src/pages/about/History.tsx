
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const History = () => {
  const milestones = [
    {
      year: 2018,
      title: "Fondation de Chargeurs.ch",
      description: "Création de l'entreprise par Sophie Dubois avec une vision claire : construire l'infrastructure de recharge la plus accessible et la plus fiable de Suisse.",
      image: "https://images.unsplash.com/photo-1518600654093-2a24cddafa38?w=800&h=500&fit=crop"
    },
    {
      year: 2019,
      title: "Premier réseau de bornes",
      description: "Installation des premières bornes de recharge rapide dans les principales villes suisses, marquant le début de notre expansion nationale.",
      image: "https://images.unsplash.com/photo-1558389186-438d8a3dd6aa?w=800&h=500&fit=crop"
    },
    {
      year: 2020,
      title: "Lancement de l'application mobile",
      description: "Développement et lancement de notre application permettant de localiser les bornes, suivre la recharge en temps réel et effectuer les paiements de manière sécurisée.",
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&h=500&fit=crop"
    },
    {
      year: 2021,
      title: "Partenariats stratégiques",
      description: "Conclusion d'accords avec des constructeurs automobiles, des centres commerciaux et des chaînes hôtelières pour étendre notre réseau de recharge.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=500&fit=crop"
    },
    {
      year: 2022,
      title: "Expansion internationale",
      description: "Ouverture de nos premiers points de recharge dans les pays voisins, marquant le début de notre expansion au-delà des frontières suisses.",
      image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop"
    },
    {
      year: 2023,
      title: "Innovation technologique",
      description: "Lancement de notre borne de recharge ultra-rapide de nouvelle génération, capable de délivrer jusqu'à 350 kW de puissance.",
      image: "https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?w=800&h=500&fit=crop"
    },
    {
      year: 2024,
      title: "Engagement pour un avenir durable",
      description: "Transition vers un approvisionnement 100% en énergie renouvelable pour l'ensemble de notre réseau et lancement de notre initiative de reforestation.",
      image: "https://images.unsplash.com/photo-1623227866882-c005c26dfe41?w=800&h=500&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Notre Histoire</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Retracez le parcours de Chargeurs.ch depuis sa création jusqu'à aujourd'hui, et découvrez comment nous avons contribué à façonner le paysage de la mobilité électrique en Suisse.
          </p>
        </div>

        <div className="relative border-l-2 border-electric-blue pl-12 pb-8 ml-6 md:ml-12 mb-16">
          {milestones.map((milestone, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <div className="absolute -left-6 mt-1.5 w-10 h-10 rounded-full bg-electric-blue text-white flex items-center justify-center">
                {milestone.year.toString().substring(2)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                  <div className="text-2xl font-bold mb-1">{milestone.year}</div>
                  <h3 className="text-xl font-semibold mb-4">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
                <div className="md:col-span-3 rounded-xl overflow-hidden">
                  <img 
                    src={milestone.image} 
                    alt={milestone.title} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nos récompenses et reconnaissances</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-electric-blue/20">
              <CardContent className="pt-6 text-center">
                <div className="text-electric-blue mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Prix de l'Innovation 2020</h3>
                <p className="text-muted-foreground">
                  Décerné par SwissCleantech pour notre système de gestion intelligente de l'énergie.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-electric-blue/20">
              <CardContent className="pt-6 text-center">
                <div className="text-electric-blue mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M8 17h8"></path><path d="M12 4v13"></path><path d="M18.5 13a2.5 2.5 0 0 0 0-5h-.5"></path><path d="M9.5 13H5a1 1 0 0 1 0-2h.5a2.5 2.5 0 0 0 0-5c-4.5.5-4.5 6.5 0 7h1.5"></path><path d="M13 17c.9.6 2 1 3.5 1a5.5 5.5 0 0 0 0-11H16"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Certification Carbon Neutral 2022</h3>
                <p className="text-muted-foreground">
                  Reconnaissance de nos efforts pour atteindre la neutralité carbone dans nos opérations.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-electric-blue/20">
              <CardContent className="pt-6 text-center">
                <div className="text-electric-blue mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M5 20V4h4l2 2h5.07"></path><path d="M5 10h14"></path><path d="M20 12V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1"></path><path d="M22 9a2 2 0 0 0 0-4"></path><path d="M16 9h-5a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8"></path><path d="M13 17v3"></path><path d="M8 17v3"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Prix Business Durable 2023</h3>
                <p className="text-muted-foreground">
                  Récompense de notre modèle économique durable par le Forum Économique Suisse.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-16" />

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Notre vision pour l'avenir</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Nous continuons à innover et à développer notre réseau pour rendre la recharge électrique encore plus accessible, plus rapide et plus durable pour tous.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-muted rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Expansion du réseau</h3>
              <p className="text-muted-foreground">
                D'ici 2026, nous visons à tripler la taille de notre réseau pour couvrir 100% des autoroutes suisses et être présents dans chaque commune de plus de 5'000 habitants.
              </p>
            </div>
            <div className="p-6 bg-muted rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Innovation technologique</h3>
              <p className="text-muted-foreground">
                Nos équipes R&D travaillent sur la prochaine génération de bornes ultra-rapides, ainsi que sur des solutions de stockage d'énergie avancées pour optimiser notre impact environnemental.
              </p>
            </div>
            <div className="p-6 bg-muted rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Démocratisation de l'accès</h3>
              <p className="text-muted-foreground">
                Nous développons de nouveaux modèles économiques pour rendre la recharge électrique plus abordable et accessible à tous, peu importe leur lieu d'habitation ou leur type de véhicule.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-electric-blue text-white rounded-xl overflow-hidden py-12 px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez-nous dans cette aventure</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Que vous soyez un particulier, une entreprise ou une collectivité, devenez acteur de la révolution de la mobilité électrique en Suisse avec Chargeurs.ch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="inline-block bg-white text-electric-blue font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Contactez-nous
            </a>
            <a 
              href="/subscriptions" 
              className="inline-block bg-transparent border border-white text-white font-medium py-3 px-6 rounded-full hover:bg-white/10 transition-colors"
            >
              Nos abonnements
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
