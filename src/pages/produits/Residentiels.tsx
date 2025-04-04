
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProduitsResidentiels = () => {
  const products = [
    {
      id: 1,
      name: "EcoCharge Home",
      description: "Notre borne de recharge domestique la plus populaire, idéale pour les maisons individuelles.",
      price: "1'290 CHF",
      features: [
        "Puissance de 7.4 kW",
        "Compatible Type 2",
        "Installation simple",
        "Contrôle via application mobile",
        "Design élégant et compact"
      ],
      image: "https://images.unsplash.com/photo-1592502712944-28c612639be5?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "EcoCharge Home Plus",
      description: "Solution avancée avec fonctionnalités intelligentes pour optimiser votre consommation d'énergie.",
      price: "1'890 CHF",
      features: [
        "Puissance de 11 kW",
        "Compatible Type 2",
        "Gestion intelligente de l'énergie",
        "Intégration photovoltaïque",
        "Équilibrage de charge"
      ],
      image: "https://images.unsplash.com/photo-1621692943864-55c7e56256d6?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "EcoCharge Home Premium",
      description: "Notre solution haut de gamme pour les propriétaires exigeants avec plusieurs véhicules électriques.",
      price: "2'490 CHF",
      features: [
        "Puissance de 22 kW",
        "Compatible Type 2",
        "Double point de charge",
        "Analyse de consommation détaillée",
        "Design personnalisable"
      ],
      image: "https://images.unsplash.com/photo-1622390550274-1f0100cd9ae2?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const benefits = [
    {
      title: "Installation professionnelle",
      description: "Nos techniciens certifiés assurent une installation conforme aux normes suisses de sécurité."
    },
    {
      title: "Garantie 5 ans",
      description: "Toutes nos bornes résidentielles sont couvertes par une garantie complète de 5 ans."
    },
    {
      title: "Support 24/7",
      description: "Une assistance technique est disponible à tout moment pour résoudre rapidement vos problèmes."
    },
    {
      title: "Mise à jour automatique",
      description: "Nos bornes connectées reçoivent régulièrement des mises à jour logicielles gratuites."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bornes de Recharge Résidentielles</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nos solutions de recharge pour particuliers combinent simplicité d'utilisation, 
              fiabilité et technologies avancées pour une expérience optimale à domicile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {products.map(product => (
              <Card key={product.id} className="flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {product.price}
                    </Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="font-semibold mb-2">Caractéristiques :</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button className="flex-1">Détails</Button>
                  <Button variant="outline" className="flex-1">Devis gratuit</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-card border rounded-xl p-8 mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Les avantages de nos solutions résidentielles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-2xl font-bold mb-6">Vous ne savez pas quelle borne choisir ?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Nos conseillers sont à votre disposition pour vous aider à sélectionner 
              la solution qui correspond le mieux à vos besoins et à votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Nous contacter</Button>
              </Link>
              <Link to="/appointment">
                <Button variant="outline" size="lg">Prendre rendez-vous</Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Installation professionnelle</h2>
                <p className="mb-4">
                  L'installation d'une borne de recharge nécessite des compétences techniques spécifiques 
                  et doit respecter les normes de sécurité en vigueur. Nos techniciens certifiés 
                  garantissent une installation conforme et sécurisée.
                </p>
                <p className="mb-6">
                  Le service d'installation comprend :
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Étude technique préalable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Installation et raccordement électrique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Configuration et mise en service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Tests de sécurité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Formation à l'utilisation</span>
                  </li>
                </ul>
                <Link to="/services/installation">
                  <Button>En savoir plus sur l'installation</Button>
                </Link>
              </div>
              <div className="h-80 bg-accent rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621364525332-f9fa7fdea8d1?w=800&auto=format&fit=crop&q=60" 
                  alt="Installation d'une borne de recharge" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsResidentiels;
