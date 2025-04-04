
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, HomeIcon, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProduitsResidentiels = () => {
  const products = [
    {
      id: 'eco',
      name: 'EcoCharge Home',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      price: 'CHF 899',
      description: 'Solution idéale pour les particuliers avec un seul véhicule électrique.',
      power: '7.4 kW',
      features: [
        'Installation murale simple',
        'Design compact et élégant',
        'Connectivité Wi-Fi',
        'Application mobile de contrôle',
        'Programmation de recharge'
      ]
    },
    {
      id: 'smart',
      name: 'SmartCharge Home Plus',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      price: 'CHF 1299',
      description: 'Borne intelligente idéale pour les foyers avec plusieurs véhicules.',
      power: '11 kW',
      features: [
        'Gestion intelligente de l'énergie',
        'Possibilité de couplage avec installation solaire',
        'Contrôle des coûts et statistiques détaillées',
        'Mise à jour automatique du logiciel',
        'Compatibilité avec tous les véhicules électriques',
        'Garantie 5 ans'
      ],
      highlighted: true
    },
    {
      id: 'premium',
      name: 'PremiumCharge Home',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      price: 'CHF 1799',
      description: 'La solution haut de gamme pour une recharge ultra-rapide à domicile.',
      power: '22 kW',
      features: [
        'Recharge ultra-rapide',
        'Système de récupération d'énergie',
        'Design personnalisable',
        'Écran tactile intégré',
        'Reconnaissance faciale pour la sécurité',
        'Garantie 7 ans avec service premium'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bornes de Recharge Résidentielles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des solutions de recharge fiables et intelligentes pour votre domicile, adaptées à tous les véhicules électriques.
            </p>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HomeIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Installation Facile</h3>
                <p className="text-muted-foreground">
                  Nos techniciens certifiés installent votre borne en respectant les normes de sécurité.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Recharge Optimisée</h3>
                <p className="text-muted-foreground">
                  Nos bornes intelligentes optimisent la recharge pour réduire vos coûts d'électricité.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Garantie Étendue</h3>
                <p className="text-muted-foreground">
                  Toutes nos bornes résidentielles sont couvertes par une garantie de 3 à 7 ans.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <Card key={product.id} className={`flex flex-col h-full ${product.highlighted ? 'border-primary shadow-lg' : ''}`}>
                {product.highlighted && (
                  <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                    Le plus populaire
                  </div>
                )}
                <CardHeader>
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Puissance: {product.power}</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{product.price}</div>
                  <CardDescription className="mt-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={product.highlighted ? "default" : "outline"}>
                    En savoir plus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <Tabs defaultValue="specifications">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Caractéristiques Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Général</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Compatibilité:</span>
                        <span>Tous les véhicules électriques (Type 2)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Température d'utilisation:</span>
                        <span>-30°C à +50°C</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Indice de protection:</span>
                        <span>IP54 (résistant aux intempéries)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Dimensions:</span>
                        <span>30 x 20 x 12 cm (selon modèle)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Fonctionnalités</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Connectivité:</span>
                        <span>Wi-Fi, Bluetooth, Ethernet (selon modèle)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Authentification:</span>
                        <span>Application mobile, RFID</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Mise à jour logicielle:</span>
                        <span>Over-the-air (OTA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium min-w-[180px]">Protection:</span>
                        <span>Surcharge, court-circuit, surchauffe</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="installation" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Installation et Mise en Service</h3>
                <p className="mb-4">
                  L'installation d'une borne de recharge à domicile nécessite l'intervention d'un électricien certifié pour garantir la sécurité et la conformité.
                </p>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Étapes d'installation</h4>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8 mt-0.5 flex-shrink-0">
                        <span className="font-medium">1</span>
                      </div>
                      <div>
                        <span className="font-medium">Visite technique préalable</span>
                        <p className="text-sm text-muted-foreground mt-1">Un technicien évalue votre installation électrique et détermine les travaux nécessaires.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8 mt-0.5 flex-shrink-0">
                        <span className="font-medium">2</span>
                      </div>
                      <div>
                        <span className="font-medium">Préparation et câblage</span>
                        <p className="text-sm text-muted-foreground mt-1">Installation du câblage dédié et des protections électriques nécessaires.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8 mt-0.5 flex-shrink-0">
                        <span className="font-medium">3</span>
                      </div>
                      <div>
                        <span className="font-medium">Montage et raccordement</span>
                        <p className="text-sm text-muted-foreground mt-1">Fixation de la borne et raccordement électrique.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8 mt-0.5 flex-shrink-0">
                        <span className="font-medium">4</span>
                      </div>
                      <div>
                        <span className="font-medium">Tests et mise en service</span>
                        <p className="text-sm text-muted-foreground mt-1">Vérification du bon fonctionnement et configuration initiale.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8 mt-0.5 flex-shrink-0">
                        <span className="font-medium">5</span>
                      </div>
                      <div>
                        <span className="font-medium">Formation et remise du certificat</span>
                        <p className="text-sm text-muted-foreground mt-1">Explication du fonctionnement et remise des documents.</p>
                      </div>
                    </li>
                  </ol>
                </div>
                <Button asChild>
                  <Link to="/services/installation">En savoir plus sur nos services d'installation</Link>
                </Button>
              </TabsContent>
              <TabsContent value="faq" className="p-6 border rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-4">Questions Fréquentes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Quelle puissance de borne choisir pour mon domicile ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Le choix dépend de plusieurs facteurs : la puissance de votre abonnement électrique, la capacité de charge de votre véhicule et vos habitudes d'utilisation. Nos conseillers peuvent vous aider à déterminer la solution optimale lors d'une consultation personnalisée.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Faut-il augmenter la puissance de mon compteur électrique ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pas nécessairement. Nos bornes intelligentes peuvent gérer la consommation d'énergie pour éviter de dépasser votre puissance souscrite. Nous évaluons votre installation existante avant de recommander une solution.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Combien de temps prend l'installation ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      L'installation standard prend généralement entre 2 et 4 heures, selon la complexité de votre installation électrique et l'emplacement choisi pour la borne.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Est-il possible d'intégrer ma borne avec mon installation photovoltaïque ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Oui, nos bornes SmartCharge et PremiumCharge sont compatibles avec les installations solaires et peuvent être programmées pour recharger prioritairement avec l'énergie solaire produite.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Puis-je programmer ma borne pour charger pendant les heures creuses ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Absolument. Toutes nos bornes résidentielles permettent la programmation horaire via l'application mobile pour profiter des tarifs heures creuses.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Prêt à passer à l'électrique ?</h3>
              <p className="opacity-90">
                Prenez rendez-vous avec l'un de nos conseillers pour une consultation personnalisée.
              </p>
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/appointment">Prendre rendez-vous</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsResidentiels;
