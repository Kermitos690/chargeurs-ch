
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
      name: "EcoPower Mini",
      description: "Notre powerbank la plus populaire, idéale pour une utilisation quotidienne.",
      price: "129 CHF",
      features: [
        "Capacité de 10'000 mAh",
        "Compatible USB-C et USB-A",
        "Design compact et léger",
        "Contrôle via application mobile",
        "Design élégant et compact"
      ],
      image: "https://images.unsplash.com/photo-1592502712944-28c612639be5?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "EcoPower Plus",
      description: "Solution avancée avec fonctionnalités intelligentes pour optimiser votre consommation d'énergie.",
      price: "189 CHF",
      features: [
        "Capacité de 20'000 mAh",
        "Compatible USB-C et USB-A",
        "Charge rapide 30W",
        "Recharge sans fil intégrée",
        "Indicateur LED de charge"
      ],
      image: "https://images.unsplash.com/photo-1621692943864-55c7e56256d6?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "EcoPower Premium",
      description: "Notre solution haut de gamme pour les utilisateurs exigeants avec plusieurs appareils à charger.",
      price: "249 CHF",
      features: [
        "Capacité de 30'000 mAh",
        "Compatible USB-C, USB-A et Lightning",
        "Charge rapide 60W",
        "Plusieurs appareils simultanément",
        "Écran LCD intégré"
      ],
      image: "https://images.unsplash.com/photo-1622390550274-1f0100cd9ae2?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const benefits = [
    {
      title: "Garantie qualité",
      description: "Toutes nos powerbanks sont couvertes par une garantie complète de 2 ans."
    },
    {
      title: "Livraison rapide",
      description: "Livraison en 24h en Suisse et remboursement si vous n'êtes pas satisfait."
    },
    {
      title: "Support 24/7",
      description: "Une assistance technique est disponible à tout moment pour résoudre rapidement vos problèmes."
    },
    {
      title: "Mise à jour automatique",
      description: "Nos powerbanks connectées reçoivent régulièrement des mises à jour logicielles gratuites."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Powerbanks pour Particuliers</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nos solutions de powerbanks pour particuliers combinent simplicité d'utilisation, 
              fiabilité et technologies avancées pour une expérience optimale au quotidien.
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
            <h2 className="text-2xl font-bold mb-8 text-center">Les avantages de nos powerbanks</h2>
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
            <h2 className="text-2xl font-bold mb-6">Vous ne savez pas quelle powerbank choisir ?</h2>
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
                <h2 className="text-2xl font-bold mb-4">Service client premium</h2>
                <p className="mb-4">
                  L'achat d'une powerbank n'est que le début. Notre équipe de support client est là pour vous 
                  accompagner tout au long de votre expérience avec nos produits.
                </p>
                <p className="mb-6">
                  Notre service client comprend :
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Assistance technique par téléphone ou email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Tutoriels vidéo et guides d'utilisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Programme de remplacement en cas de défaut</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Conseils pour optimiser l'utilisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                    <span>Service après-vente réactif</span>
                  </li>
                </ul>
                <Link to="/services/support">
                  <Button>En savoir plus sur notre support</Button>
                </Link>
              </div>
              <div className="h-80 bg-accent rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621364525332-f9fa7fdea8d1?w=800&auto=format&fit=crop&q=60" 
                  alt="Service client powerbank" 
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
