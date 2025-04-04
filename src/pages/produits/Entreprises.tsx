
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Building, Users, BarChart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProduitsEntreprises = () => {
  const solutions = [
    {
      id: 'business',
      name: 'BusinessCharge',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Solution complète pour les petites et moyennes entreprises',
      features: [
        '2 à 10 points de charge',
        'Gestion des accès utilisateurs',
        'Suivi de consommation',
        'Facturation automatisée',
        'Compatible avec différents véhicules'
      ]
    },
    {
      id: 'fleet',
      name: 'FleetCharge',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Système optimisé pour les flottes de véhicules électriques',
      features: [
        'Jusqu'à 50 points de charge',
        'Équilibrage dynamique de charge',
        'Intégration avec votre système de gestion de flotte',
        'Rapports détaillés d'utilisation',
        'Maintenance préventive',
        'Support dédié 24/7'
      ],
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'EnterpriseCharge',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Infrastructure complète pour les grandes entreprises',
      features: [
        'Nombre illimité de points de charge',
        'Solution entièrement personnalisable',
        'Intégration avec vos systèmes existants',
        'Analyse prédictive et optimisation énergétique',
        'Service de conseil en électromobilité',
        'Garantie de disponibilité 99,9%'
      ]
    }
  ];

  const clientTypes = [
    {
      type: 'Bureaux d'entreprises',
      icon: <Building className="h-10 w-10 text-primary" />,
      description: 'Offrez un service de recharge à vos employés et visiteurs tout en valorisant votre engagement écologique.',
      benefits: [
        'Attraction et rétention des talents',
        'Réduction de l'empreinte carbone',
        'Valorisation de votre image de marque',
        'Avantage fiscal potentiel'
      ]
    },
    {
      type: 'Gestionnaires de flottes',
      icon: <Users className="h-10 w-10 text-primary" />,
      description: 'Optimisez la gestion de votre flotte électrique avec une solution complète de recharge et de suivi.',
      benefits: [
        'Réduction des coûts d'exploitation',
        'Optimisation des cycles de recharge',
        'Suivi précis des consommations par véhicule',
        'Planification simplifiée des rotations'
      ]
    },
    {
      type: 'Parkings commerciaux',
      icon: <BarChart className="h-10 w-10 text-primary" />,
      description: 'Transformez vos places de parking en sources de revenus additionnels grâce à nos solutions de recharge.',
      benefits: [
        'Nouvelle source de revenus',
        'Augmentation de la fréquentation',
        'Fidélisation de la clientèle',
        'Différenciation concurrentielle'
      ]
    },
    {
      type: 'Copropriétés et résidences',
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      description: 'Équipez votre immeuble d'une infrastructure évolutive répondant aux besoins de tous les résidents.',
      benefits: [
        'Solution évolutive selon les besoins',
        'Facturation individuelle simplifiée',
        'Valorisation du bien immobilier',
        'Conformité avec les nouvelles réglementations'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Solutions de Recharge pour Entreprises</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des infrastructures de recharge évolutives et intelligentes pour accompagner votre transition vers la mobilité électrique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="glass-panel rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                alt="Solution de recharge pour entreprises" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Pourquoi choisir nos solutions professionnelles ?</h2>
              <p className="text-muted-foreground mb-6">
                Nos solutions de recharge pour entreprises sont conçues pour s'adapter à vos besoins spécifiques, qu'il s'agisse d'équiper un petit parking d'entreprise ou de déployer une infrastructure complète de recharge pour une grande flotte de véhicules.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Évolutivité</span>
                    <p className="text-sm text-muted-foreground mt-1">Notre infrastructure s'adapte à vos besoins futurs sans remplacement complet.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Gestion intelligente</span>
                    <p className="text-sm text-muted-foreground mt-1">Optimisation automatique de la consommation énergétique et équilibrage de charge.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Service complet</span>
                    <p className="text-sm text-muted-foreground mt-1">De l'étude de faisabilité à la maintenance, nous vous accompagnons à chaque étape.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Compatibilité universelle</span>
                    <p className="text-sm text-muted-foreground mt-1">Compatible avec tous les véhicules électriques du marché.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Nos Solutions Professionnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Card key={solution.id} className={`flex flex-col h-full ${solution.highlighted ? 'border-primary shadow-lg' : ''}`}>
                  {solution.highlighted && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                      Solution recommandée
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={solution.image} 
                        alt={solution.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle>{solution.name}</CardTitle>
                    <CardDescription className="mt-2">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={solution.highlighted ? "default" : "outline"}>
                      Demander un devis
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">À qui s'adressent nos solutions ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clientTypes.map((client, index) => (
                <Card key={index} className="border-0 shadow-none bg-transparent">
                  <CardHeader>
                    <div className="mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      {client.icon}
                    </div>
                    <CardTitle>{client.type}</CardTitle>
                    <CardDescription className="mt-2">{client.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Avantages:</h4>
                    <ul className="space-y-1">
                      {client.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <Tabs defaultValue="service">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="service">Notre service</TabsTrigger>
                <TabsTrigger value="process">Processus</TabsTrigger>
                <TabsTrigger value="case-studies">Études de cas</TabsTrigger>
              </TabsList>
              <TabsContent value="service" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Un Service Complet et Sur Mesure</h3>
                <p className="mb-4">
                  Chaque entreprise a des besoins spécifiques en matière de recharge électrique. C'est pourquoi nous proposons un service complet et personnalisé pour vous accompagner à chaque étape de votre projet.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Étude et conseil</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Analyse de vos besoins actuels et futurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Étude de faisabilité technique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Analyse de rentabilité et ROI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Conseil sur les subventions disponibles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Installation et support</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Installation par des techniciens certifiés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Formation de vos équipes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Maintenance préventive et corrective</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Support technique dédié</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="process" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Notre Processus d'Implémentation</h3>
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 mt-0.5 flex-shrink-0">
                      <span className="font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Consultation initiale</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nous discutons de vos besoins, de vos objectifs et de votre infrastructure existante pour comprendre parfaitement votre situation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 mt-0.5 flex-shrink-0">
                      <span className="font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Étude technique et proposition</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nos ingénieurs réalisent une étude approfondie et vous présentent une solution sur mesure avec différentes options.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 mt-0.5 flex-shrink-0">
                      <span className="font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Installation et configuration</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notre équipe installe l'infrastructure de recharge selon le planning convenu, avec un minimum d'interruption pour votre activité.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 mt-0.5 flex-shrink-0">
                      <span className="font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Formation et mise en service</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nous formons vos équipes à l'utilisation du système et activons toutes les fonctionnalités de votre plateforme de gestion.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 mt-0.5 flex-shrink-0">
                      <span className="font-medium">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Suivi et optimisation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Nous assurons un suivi régulier pour optimiser le fonctionnement de votre infrastructure et l'adapter à l'évolution de vos besoins.
                      </p>
                    </div>
                  </li>
                </ol>
              </TabsContent>
              <TabsContent value="case-studies" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Ils nous font confiance</h3>
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">TechnoSphere SA - Siège social à Lausanne</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Déploiement d'une solution FleetCharge pour une flotte de 25 véhicules et 10 places visiteurs.
                    </p>
                    <div className="bg-white p-3 rounded border italic text-sm">
                      "L'implémentation s'est déroulée sans accroc et nous sommes ravis de la flexibilité du système. La plateforme de gestion nous permet un suivi précis des consommations et une facturation automatisée pour nos employés."
                      <div className="mt-2 font-medium not-italic">— Marc Dupont, Directeur des Services Généraux</div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">Centre Commercial Les Terrasses - Nyon</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Installation de 20 points de charge publics avec système de paiement intégré.
                    </p>
                    <div className="bg-white p-3 rounded border italic text-sm">
                      "Les bornes de recharge sont devenues un véritable atout pour notre centre commercial. Nous avons constaté une augmentation de la durée des visites et attiré une nouvelle clientèle soucieuse de l'environnement."
                      <div className="mt-2 font-medium not-italic">— Sophie Laurent, Directrice</div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">Résidence Les Cèdres - Copropriété de 60 appartements</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Équipement du parking souterrain avec une infrastructure évolutive pour 15 places initialement.
                    </p>
                    <div className="bg-white p-3 rounded border italic text-sm">
                      "La solution proposée par Chargeurs.ch était exactement ce qu'il nous fallait : un système évolutif qui permet d'ajouter des points de charge au fur et à mesure des besoins des résidents, avec une facturation individuelle simple."
                      <div className="mt-2 font-medium not-italic">— Jean Moreau, Président du Conseil de Copropriété</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Prêt à électrifier votre entreprise ?</h3>
              <p className="opacity-90">
                Contactez-nous pour une étude personnalisée et un devis gratuit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary" size="lg" asChild>
                <Link to="/appointment">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsEntreprises;
