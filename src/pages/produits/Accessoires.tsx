
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Check } from 'lucide-react';

const ProduitsAccessoires = () => {
  const accessories = [
    {
      id: 'cable-type2',
      name: 'Câble de recharge Type 2',
      price: 'CHF 249',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Câble de recharge haute qualité Type 2 pour véhicules électriques, 7,5 mètres.',
      features: [
        'Compatible avec toutes les bornes Type 2',
        'Longueur: 7,5 mètres',
        'Intensité max: 32A',
        'Étanche (IP67) et résistant aux UV',
        'Garantie 3 ans'
      ],
      stock: true
    },
    {
      id: 'support-mural',
      name: 'Support mural pour câble',
      price: 'CHF 59',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Support mural élégant pour ranger votre câble de recharge proprement et en toute sécurité.',
      features: [
        'Installation facile',
        'Compatible avec tous types de câbles',
        'Matériau résistant aux intempéries',
        'Design élégant et discret',
        'Kit de montage inclus'
      ],
      stock: true
    },
    {
      id: 'adaptateur-cee',
      name: 'Adaptateur CEE vers Type 2',
      price: 'CHF 179',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Adaptateur permettant de connecter votre véhicule électrique à une prise industrielle CEE.',
      features: [
        'Compatible CEE 16A ou 32A vers Type 2',
        'Protection intégrée',
        'Voyant lumineux de fonctionnement',
        'Compact et robuste',
        'Garantie 2 ans'
      ],
      stock: false
    },
    {
      id: 'housse-protection',
      name: 'Housse de protection pour borne',
      price: 'CHF 89',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Housse imperméable pour protéger votre borne de recharge des intempéries et de la poussière.',
      features: [
        'Matériau imperméable et résistant',
        'Protection contre les UV',
        'Compatible avec la plupart des bornes murales',
        'Fermeture sécurisée',
        'Facilement lavable'
      ],
      stock: true
    },
    {
      id: 'lecteur-rfid',
      name: 'Kit lecteur RFID',
      price: 'CHF 129',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Kit de lecteur RFID pour sécuriser l'accès à votre borne de recharge.',
      features: [
        'Compatible avec la plupart des bornes',
        '3 badges RFID inclus',
        'Installation simple',
        'Gestion de plusieurs utilisateurs',
        'Garantie 2 ans'
      ],
      stock: true
    },
    {
      id: 'carte-rfid',
      name: 'Carte RFID supplémentaire',
      price: 'CHF 19',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Carte RFID supplémentaire pour l'accès à votre borne de recharge.',
      features: [
        'Compatible avec tous nos systèmes RFID',
        'Personnalisable (nom, numéro)',
        'Format carte de crédit',
        'Matériau résistant',
        'Lot de 2 cartes'
      ],
      stock: true
    },
    {
      id: 'powerboost',
      name: 'Module PowerBoost',
      price: 'CHF 349',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Module d'optimisation de puissance pour bornes résidentielles.',
      features: [
        'Évite les surcharges du réseau domestique',
        'Installation sans intervention sur le tableau électrique',
        'Compatible avec toutes nos bornes',
        'Surveillance en temps réel',
        'Garantie 3 ans'
      ],
      stock: true
    },
    {
      id: 'panneau-signalisation',
      name: 'Panneau de signalisation',
      price: 'CHF 49',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      description: 'Panneau de signalisation pour places de stationnement avec borne de recharge.',
      features: [
        'Aluminium résistant aux intempéries',
        'Dimensions: 40 x 30 cm',
        'Pictogramme normalisé',
        'Kit de fixation inclus',
        'Personnalisable sur demande'
      ],
      stock: true
    }
  ];

  const categories = [
    { name: 'Câbles et adaptateurs', count: 12 },
    { name: 'Supports et rangements', count: 8 },
    { name: 'Protection et sécurité', count: 10 },
    { name: 'Contrôle d\'accès', count: 5 },
    { name: 'Optimisation énergétique', count: 7 },
    { name: 'Signalisation', count: 6 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessoires pour Bornes de Recharge</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complétez votre installation de recharge avec notre gamme d'accessoires pratiques et de qualité.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <div className="bg-card border rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 border-b bg-muted/50">
                    <h2 className="font-semibold">Catégories</h2>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="text-primary hover:underline flex justify-between items-center">
                          <span>Tous les accessoires</span>
                          <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{accessories.length}</span>
                        </a>
                      </li>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex justify-between items-center">
                            <span>{category.name}</span>
                            <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-muted/50">
                    <h2 className="font-semibold">Filtres</h2>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Prix</h3>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="px-3 py-1 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm flex-1"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          className="px-3 py-1 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm flex-1"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Disponibilité</h3>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>En stock uniquement</span>
                      </label>
                    </div>
                    <Button className="w-full" variant="outline" size="sm">
                      Appliquer les filtres
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Tous les accessoires</h2>
                  <p className="text-sm text-muted-foreground">Affichage de {accessories.length} produits</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Trier par:</label>
                  <select className="px-3 py-1 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm">
                    <option>Popularité</option>
                    <option>Prix: croissant</option>
                    <option>Prix: décroissant</option>
                    <option>Nom: A-Z</option>
                    <option>Nom: Z-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.map((accessory) => (
                  <Card key={accessory.id} className="flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-muted">
                        <img 
                          src={accessory.image} 
                          alt={accessory.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{accessory.name}</CardTitle>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-xl font-bold text-primary">{accessory.price}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${accessory.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {accessory.stock ? 'En stock' : 'Rupture de stock'}
                        </div>
                      </div>
                      <CardDescription className="mt-2 line-clamp-2">{accessory.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-1">
                        {accessory.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex w-full gap-2">
                        <Button className="flex-1" size="sm" variant="outline">
                          Détails
                        </Button>
                        <Button className="flex-1" size="sm" disabled={!accessory.stock}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <span className="sr-only">Page précédente</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-white">1</Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" size="sm" className="h-8 w-8">8</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <span className="sr-only">Page suivante</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Besoin de conseils pour choisir vos accessoires ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nos experts sont disponibles pour vous aider à choisir les accessoires les plus adaptés à votre installation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg">
                Nous contacter
              </Button>
              <Button variant="outline" size="lg">
                Consulter notre guide
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsAccessoires;
