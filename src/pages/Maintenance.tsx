
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Wrench, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Services de Maintenance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assurez le bon fonctionnement de vos bornes de recharge avec nos services de maintenance professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Maintenance Préventive</CardTitle>
                <CardDescription>
                  Une approche proactive pour éviter les pannes et prolonger la durée de vie de vos équipements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Inspection régulière</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Tests de sécurité électrique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Mise à jour logicielle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Nettoyage des composants</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">En savoir plus</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Maintenance Corrective</CardTitle>
                <CardDescription>
                  Une intervention rapide et efficace en cas de panne ou de dysfonctionnement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Diagnostic précis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Réparation par des techniciens certifiés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Remplacement de pièces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Assistance téléphonique 24/7</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">En savoir plus</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mise à niveau</CardTitle>
                <CardDescription>
                  Gardez vos installations à la pointe de la technologie avec nos services de mise à niveau.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Augmentation de puissance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Installation de nouveaux connecteurs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Intégration de fonctionnalités avancées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Optimisation de la gestion énergétique</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">En savoir plus</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Contrats de Maintenance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pour une tranquillité d'esprit totale, optez pour l'un de nos contrats de maintenance adaptés à vos besoins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Essentiel", 
                  price: "CHF 149", 
                  description: "Maintenance de base pour les particuliers",
                  features: [
                    "1 visite de maintenance par an",
                    "Assistance téléphonique en heures ouvrables",
                    "Mises à jour logicielles",
                    "Remise de 10% sur les pièces de rechange"
                  ]
                },
                { 
                  title: "Business", 
                  price: "CHF 299", 
                  description: "Idéal pour les petites entreprises",
                  features: [
                    "2 visites de maintenance par an",
                    "Assistance téléphonique prioritaire",
                    "Mises à jour logicielles et matérielles",
                    "Remise de 15% sur les pièces de rechange",
                    "Temps d'intervention sous 48h"
                  ],
                  highlighted: true
                },
                { 
                  title: "Premium", 
                  price: "CHF 499", 
                  description: "Pour les infrastructures critiques",
                  features: [
                    "4 visites de maintenance par an",
                    "Assistance téléphonique 24/7",
                    "Mises à jour logicielles et matérielles prioritaires",
                    "Remise de 20% sur les pièces de rechange",
                    "Temps d'intervention sous 24h",
                    "Borne de remplacement en cas de panne"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={plan.highlighted ? "border-primary shadow-lg" : ""}>
                  {plan.highlighted && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                      Le plus populaire
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-2xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground"> / an</span></div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                      Souscrire
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-12 w-12 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Besoin d'une intervention d'urgence ?</h3>
                <p className="opacity-90">
                  Notre équipe d'intervention rapide est disponible 24/7 pour résoudre les problèmes critiques.
                </p>
              </div>
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">Contacter notre support</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Maintenance;
