
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, Timer, CreditCard, BarChart } from 'lucide-react';

const ProduitsPubliques = () => {
  const solutions = [
    {
      title: "Stations urbaines",
      icon: <MapPin className="h-6 w-6 text-primary" />,
      description: "Solutions de recharge adaptées aux zones urbaines à forte densité de population.",
      features: [
        "Capacité de 10 à 20 powerbanks",
        "Paiement par carte ou application",
        "Design urbain compact",
        "Résistance aux intempéries et au vandalisme",
        "Installation sur trottoir ou espace public"
      ]
    },
    {
      title: "Stations rapides",
      icon: <Timer className="h-6 w-6 text-primary" />,
      description: "Stations haute performance pour les centres commerciaux et zones touristiques.",
      features: [
        "Recharge ultra-rapide (30W)",
        "Recharge complète en 30 minutes",
        "Multiples types de connecteurs (USB-C, Lightning)",
        "Écran tactile interactif",
        "Connectivité 4G/5G"
      ]
    },
    {
      title: "Hubs multiservices",
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      description: "Centres de recharge complets avec services additionnels pour les utilisateurs.",
      features: [
        "10 à 30 powerbanks disponibles",
        "Zone d'attente confortable",
        "WiFi gratuit",
        "Services de restauration",
        "Optimisation de l'expérience utilisateur"
      ]
    },
    {
      title: "Solutions analytiques",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      description: "Plateforme de gestion complète pour exploitants de stations publiques.",
      features: [
        "Tableau de bord en temps réel",
        "Analyses de fréquentation",
        "Gestion tarifaire dynamique",
        "Maintenance prédictive",
        "Intégration aux réseaux de partage"
      ]
    }
  ];

  const partnerships = [
    {
      title: "Communes et collectivités",
      description: "Nous accompagnons les communes dans le déploiement de solutions de recharge publiques adaptées à leurs besoins spécifiques et conformes aux réglementations locales.",
      benefits: [
        "Financement par subventions cantonales ou fédérales",
        "Maintenance complète incluse",
        "Solution clé en main",
        "Personnalisation aux couleurs de la commune"
      ]
    },
    {
      title: "Centres commerciaux",
      description: "Transformez votre espace commercial en atout avec un service de recharge pour smartphones à vos clients pendant qu'ils font leurs achats.",
      benefits: [
        "Augmentation du temps passé en magasin",
        "Attraction d'une clientèle connectée",
        "Source de revenus additionnels",
        "Visibilité sur les applications de recharge"
      ]
    },
    {
      title: "Hôtellerie et restauration",
      description: "Différenciez-vous de la concurrence en proposant des services de recharge premium pour vos clients.",
      benefits: [
        "Service 5 étoiles pour vos clients",
        "Augmentation de la fidélité client",
        "Attraction d'une nouvelle clientèle",
        "Positionnement innovant"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Stations de Recharge Publiques</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des solutions complètes pour le déploiement, l'exploitation et la maintenance 
              de stations de recharge pour smartphones accessibles au public.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {solutions.map((solution, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {solution.icon}
                    <CardTitle>{solution.title}</CardTitle>
                  </div>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Demander un devis</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mb-20">
            <div className="h-80 bg-accent rounded-xl overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?w=800&auto=format&fit=crop&q=60" 
                alt="Station de recharge publique" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Fiabilité</h3>
                <p className="text-muted-foreground">
                  Nos stations publiques sont conçues pour fonctionner 24/7 avec un taux de 
                  disponibilité supérieur à 99,5%, garantissant une expérience utilisateur optimale.
                </p>
              </div>
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Interopérabilité</h3>
                <p className="text-muted-foreground">
                  Compatibles avec tous les types de smartphones, nos stations permettent la recharge 
                  avec n'importe quelle carte ou application de notre réseau.
                </p>
              </div>
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Évolutivité</h3>
                <p className="text-muted-foreground">
                  Nos solutions sont modulaires et peuvent évoluer pour s'adapter à l'augmentation 
                  de la demande et aux avancées technologiques des smartphones.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Nos partenariats</h2>
            {partnerships.map((partnership, index) => (
              <div key={index} className="bg-muted p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-3">{partnership.title}</h3>
                <p className="mb-4">{partnership.description}</p>
                <div className="pl-4 border-l-2 border-primary">
                  <h4 className="font-medium mb-2">Avantages :</h4>
                  <ul className="space-y-1">
                    {partnership.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border rounded-xl p-8 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Processus de déploiement</h2>
                <p className="mb-6">
                  Notre approche clé en main vous accompagne à travers toutes les étapes du déploiement 
                  de votre infrastructure de recharge publique pour smartphones.
                </p>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold">Étude de faisabilité</h3>
                      <p className="text-muted-foreground text-sm">Analyse du site, des besoins en puissance et des contraintes techniques.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold">Conception et dimensionnement</h3>
                      <p className="text-muted-foreground text-sm">Élaboration d'une solution adaptée à vos besoins et à votre budget.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold">Installation et raccordement</h3>
                      <p className="text-muted-foreground text-sm">Réalisation des travaux d'installation électrique et de mise en place.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-semibold">Mise en service et formation</h3>
                      <p className="text-muted-foreground text-sm">Configuration, tests et formation des exploitants.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-semibold">Maintenance et support</h3>
                      <p className="text-muted-foreground text-sm">Suivi continu, maintenance préventive et corrective, assistance 24/7.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="h-80 bg-accent rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1622652701426-806e48613abd?w=800&auto=format&fit=crop&q=60" 
                  alt="Installation d'une station de recharge" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Intéressé par nos solutions publiques ?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Nos équipes sont à votre disposition pour étudier votre projet et vous proposer 
              une solution adaptée à vos besoins et à votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Contacter nos experts</Button>
              </Link>
              <Link to="/appointment">
                <Button variant="outline" size="lg">Prendre rendez-vous</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsPubliques;
