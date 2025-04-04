
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const ProduitsAccessoires = () => {
  const accessories = [
    {
      id: 1,
      name: "Câble de recharge Type 2",
      description: "Câble de recharge renforcé compatible avec toutes les bornes Type 2, idéal pour un usage quotidien.",
      price: "290 CHF",
      image: "https://images.unsplash.com/photo-1620752421345-baae8d9336f6?w=800&auto=format&fit=crop&q=60",
      specs: [
        "Longueur: 5 mètres",
        "Ampérage: 32A",
        "Gaine haute résistance",
        "Compatible toutes saisons",
        "Garantie 24 mois"
      ]
    },
    {
      id: 2,
      name: "Support mural pour câble",
      description: "Support design et fonctionnel pour ranger votre câble de recharge proprement et en toute sécurité.",
      price: "79 CHF",
      image: "https://images.unsplash.com/photo-1633174524827-db00a6b9c7b1?w=800&auto=format&fit=crop&q=60",
      specs: [
        "Acier inoxydable",
        "Installation facile",
        "Compatible avec tous types de câbles",
        "Design élégant",
        "Résistant aux intempéries"
      ]
    },
    {
      id: 3,
      name: "Adaptateur CHAdeMO vers CCS",
      description: "Adaptateur permettant de connecter un véhicule équipé d'une prise CCS à une borne CHAdeMO.",
      price: "450 CHF",
      image: "https://images.unsplash.com/photo-1631083731032-f3cdde056225?w=800&auto=format&fit=crop&q=60",
      specs: [
        "Puissance max: 50kW",
        "Sécurité intégrée",
        "Compact et léger",
        "Certifié CE",
        "Garantie 24 mois"
      ]
    },
    {
      id: 4,
      name: "Carte RFID multi-réseaux",
      description: "Carte RFID permettant d'accéder à plus de 95% des bornes de recharge publiques en Suisse et en Europe.",
      price: "25 CHF",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60",
      specs: [
        "Compatible avec +150'000 bornes",
        "Technologie NFC",
        "Sans abonnement",
        "Application de gestion",
        "Service client 24/7"
      ]
    },
    {
      id: 5,
      name: "Borne de recharge portable",
      description: "Solution de recharge portable pour les situations d'urgence ou les déplacements occasionnels.",
      price: "390 CHF",
      image: "https://images.unsplash.com/photo-1618030941059-d3c17c2f20a4?w=800&auto=format&fit=crop&q=60",
      specs: [
        "Puissance: 3.7 kW",
        "Compatible prise domestique",
        "Mallette de transport",
        "Protection intégrée",
        "Garantie 24 mois"
      ]
    },
    {
      id: 6,
      name: "Kit de protection intempéries",
      description: "Protégez votre connexion de recharge contre les intempéries pour une utilisation en extérieur en toute sécurité.",
      price: "95 CHF",
      image: "https://images.unsplash.com/photo-1594818020972-e96e69a05f28?w=800&auto=format&fit=crop&q=60",
      specs: [
        "100% étanche (IP67)",
        "Compatible Type 1 et Type 2",
        "Matériaux durables",
        "Système de verrouillage",
        "Résistant aux UV"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessoires de Recharge</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre gamme complète d'accessoires pour optimiser et faciliter 
              la recharge de votre véhicule électrique au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {accessories.map(item => (
              <Card key={item.id} className="flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{item.name}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {item.price}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="font-semibold mb-2">Caractéristiques :</h3>
                  <ul className="space-y-1">
                    {item.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted p-8 rounded-xl mb-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Services associés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
                <p className="text-muted-foreground mb-4">
                  Livraison en 24-48h dans toute la Suisse pour les accessoires en stock.
                </p>
                <div className="flex justify-center">
                  <Badge variant="outline">Gratuite dès 100 CHF</Badge>
                </div>
              </div>
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Installation sur site</h3>
                <p className="text-muted-foreground mb-4">
                  Nos techniciens peuvent installer vos accessoires à votre domicile ou sur votre lieu de travail.
                </p>
                <div className="flex justify-center">
                  <Badge variant="outline">Sur devis</Badge>
                </div>
              </div>
              <div className="bg-card border p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Extension de garantie</h3>
                <p className="text-muted-foreground mb-4">
                  Prolongez la garantie de vos accessoires jusqu'à 5 ans pour une tranquillité totale.
                </p>
                <div className="flex justify-center">
                  <Badge variant="outline">À partir de 199 CHF</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-8 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Conseils d'utilisation</h2>
                <p className="mb-6">
                  Pour assurer la longévité de vos accessoires de recharge et garantir une utilisation 
                  en toute sécurité, voici quelques conseils pratiques :
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Inspectez régulièrement vos câbles pour détecter d'éventuels dommages</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Évitez de tordre ou d'écraser vos câbles lors du rangement</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Protégez les connecteurs de l'humidité et de la poussière</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>N'utilisez pas d'adaptateurs non homologués</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p>Suivez les recommandations du fabricant de votre véhicule</p>
                  </li>
                </ul>
              </div>
              <div className="h-80 bg-accent rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600393215717-cd9c56b3ca87?w=800&auto=format&fit=crop&q=60" 
                  alt="Utilisation d'un câble de recharge" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Besoin d'aide pour choisir ?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Notre équipe d'experts est à votre disposition pour vous guider dans le choix 
              des accessoires les plus adaptés à votre véhicule et à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Nous contacter</Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg">Consulter la FAQ</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsAccessoires;
