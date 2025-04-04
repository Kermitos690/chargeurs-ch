
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, MapPin, Clock, Zap, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProduitsPubliques = () => {
  const stations = [
    {
      id: 'urban',
      name: 'UrbanCharge',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Station de recharge urbaine compacte et fiable pour les environnements urbains à forte fréquentation.',
      power: 'Jusqu'à 22 kW (AC)',
      connectors: '2 points de charge Type 2',
      features: [
        'Design compact et élégant',
        'Résistant au vandalisme et aux intempéries (IP54)',
        'Écran tactile intuitif',
        'Paiement par carte sans contact et application mobile',
        'Éclairage LED pour une utilisation nocturne'
      ]
    },
    {
      id: 'rapid',
      name: 'RapidCharge',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Station de recharge rapide pour les axes routiers, centres commerciaux et parkings publics.',
      power: 'Jusqu'à 100 kW (DC)',
      connectors: 'CCS Combo 2, CHAdeMO, Type 2',
      features: [
        'Recharge ultra-rapide',
        'Compatible avec tous les véhicules électriques',
        'Grand écran tactile avec interface multilingue',
        'Multiples options de paiement',
        'Gestion à distance et mises à jour OTA',
        'Surveillance 24/7 et maintenance prédictive'
      ],
      highlighted: true
    },
    {
      id: 'city',
      name: 'CityCharge Hub',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      description: 'Hub de recharge complet pour créer un véritable centre de mobilité électrique.',
      power: 'AC (22 kW) et DC (150+ kW)',
      connectors: 'Jusqu'à 8 points de charge mixtes',
      features: [
        'Solution complète de hub de recharge',
        'Panneaux solaires intégrés (option)',
        'Système de stockage d'énergie (option)',
        'Espace publicitaire digital',
        'Design personnalisable aux couleurs de la ville/marque',
        'Analyse en temps réel de l'utilisation'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Stations de Recharge Publiques</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des solutions de recharge publiques fiables, rapides et accessibles pour tous les utilisateurs de véhicules électriques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Facilitez la mobilité électrique dans votre communauté</h2>
              <p className="text-muted-foreground mb-6">
                Nos stations de recharge publiques sont conçues pour répondre aux besoins des collectivités, des entreprises et des gestionnaires d'infrastructures qui souhaitent offrir un service de recharge fiable et accessible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-accent p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Emplacements Stratégiques</h3>
                  <p className="text-sm text-muted-foreground">
                    Solutions adaptées pour les centres-villes, parkings publics, centres commerciaux et axes routiers.
                  </p>
                </div>
                <div className="bg-accent p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Service Continu</h3>
                  <p className="text-sm text-muted-foreground">
                    Disponibilité 24/7 avec surveillance à distance et maintenance rapide en cas de problème.
                  </p>
                </div>
                <div className="bg-accent p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Puissance Adaptée</h3>
                  <p className="text-sm text-muted-foreground">
                    Solutions de recharge standard et rapide pour répondre à tous les besoins.
                  </p>
                </div>
                <div className="bg-accent p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Paiement Facile</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiples options de paiement: carte bancaire, application mobile, abonnement.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                alt="Station de recharge publique" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Nos Stations Publiques</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {stations.map((station) => (
                <Card key={station.id} className={`flex flex-col h-full ${station.highlighted ? 'border-primary shadow-lg' : ''}`}>
                  {station.highlighted && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                      Solution la plus demandée
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={station.image} 
                        alt={station.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle>{station.name}</CardTitle>
                    <CardDescription className="mt-2">{station.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Puissance:</span>
                        <span className="text-muted-foreground">{station.power}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Connecteurs:</span>
                        <span className="text-muted-foreground">{station.connectors}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Caractéristiques:</h4>
                      <ul className="space-y-1">
                        {station.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-xs">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={station.highlighted ? "default" : "outline"}>
                      Demander un devis
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Comparaison des Solutions</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Caractéristiques</TableHead>
                    <TableHead>UrbanCharge</TableHead>
                    <TableHead className="text-primary">RapidCharge</TableHead>
                    <TableHead>CityCharge Hub</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Puissance</TableCell>
                    <TableCell>22 kW (AC)</TableCell>
                    <TableCell>100 kW (DC)</TableCell>
                    <TableCell>22 kW (AC) + 150 kW (DC)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Points de charge</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>1-3</TableCell>
                    <TableCell>Jusqu'à 8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Temps de recharge moyen</TableCell>
                    <TableCell>1-3 heures</TableCell>
                    <TableCell>15-30 minutes</TableCell>
                    <TableCell>15 min - 3 heures</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emplacement idéal</TableCell>
                    <TableCell>Parkings urbains, commerces, hôtels</TableCell>
                    <TableCell>Axes routiers, centres commerciaux</TableCell>
                    <TableCell>Centres-villes, pôles multimodaux</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Options énergétiques</TableCell>
                    <TableCell>Réseau standard</TableCell>
                    <TableCell>Réseau renforcé</TableCell>
                    <TableCell>Réseau + solaire + stockage (optionnel)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prix indicatif</TableCell>
                    <TableCell>À partir de CHF 8'900</TableCell>
                    <TableCell>À partir de CHF 35'000</TableCell>
                    <TableCell>Sur devis</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Pourquoi Installer des Bornes Publiques ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les stations de recharge publiques apportent de nombreux avantages aux collectivités et aux entreprises qui les déploient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Attirer de nouveaux clients",
                  description: "Les conducteurs de véhicules électriques recherchent activement des lieux équipés de bornes de recharge. Attirez cette clientèle à fort pouvoir d'achat."
                },
                {
                  title: "Générer des revenus additionnels",
                  description: "Transformez vos places de parking en sources de revenus grâce aux frais de recharge et à l'augmentation du temps passé sur place."
                },
                {
                  title: "Valoriser votre image",
                  description: "Affichez votre engagement en faveur du développement durable et de l'innovation en proposant des services de recharge."
                },
                {
                  title: "Répondre aux attentes",
                  description: "Anticipez les attentes de vos citoyens, clients ou visiteurs en leur offrant un service de plus en plus demandé."
                },
                {
                  title: "Bénéficier d'aides",
                  description: "Profitez des nombreuses subventions disponibles pour le déploiement d'infrastructures de recharge."
                },
                {
                  title: "Préparer l'avenir",
                  description: "Anticipez l'évolution du parc automobile qui sera majoritairement électrique dans les prochaines années."
                }
              ].map((item, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Prêt à déployer des stations de recharge publiques ?</h3>
              <p className="opacity-90">
                Nos experts vous accompagnent dans toutes les étapes de votre projet, de l'étude de faisabilité à la mise en service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">Discuter de votre projet</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary" size="lg">
                Télécharger la brochure
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsPubliques;
