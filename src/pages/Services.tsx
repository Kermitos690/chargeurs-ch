
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Wrench, Shield, Zap, Clock, ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-accent/30 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services Professionnels</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Des solutions complètes pour tous vos besoins en matière de recharge portable et de maintenance d'équipements.
              </p>
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/contact">
                  Demander un devis gratuit
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Nos Offres de Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous proposons une gamme complète de services pour répondre à tous vos besoins en matière de recharge portable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Wrench className="h-10 w-10 text-primary" />,
                  title: "Installation Professionnelle",
                  description: "Service d'installation de bornes de recharge par des techniciens certifiés pour garantir une mise en service optimale.",
                  link: "/services/installation"
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Maintenance Préventive",
                  description: "Programme de maintenance régulière pour prévenir les pannes et assurer la durabilité de vos équipements.",
                  link: "/maintenance"
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Assistance 24/7",
                  description: "Service d'assistance technique disponible 24h/24 et 7j/7 pour répondre à vos urgences.",
                  link: "/contact"
                }
              ].map((service, index) => (
                <Card key={index} className="border border-border hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={service.link}>
                        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Service */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Service Premium de Consultation</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Notre équipe d'experts est à votre disposition pour vous accompagner dans la définition et la mise en œuvre de votre stratégie de recharge.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Étude de faisabilité et dimensionnement",
                    "Conception sur mesure pour votre établissement",
                    "Analyse de rentabilité et modèle économique",
                    "Formation du personnel à l'utilisation",
                    "Suivi et optimisation continue"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild>
                  <Link to="/contact">Prendre rendez-vous</Link>
                </Button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6">Témoignage Client</h3>
                <blockquote className="text-lg italic mb-6">
                  "Grâce aux conseils experts de l'équipe de chargeurs.ch, nous avons pu optimiser notre installation et augmenter notre taux de satisfaction client de 30% dès le premier mois."
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">Jean Dupont</p>
                    <p className="text-sm text-muted-foreground">Directeur, Bar Le Central</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Notre Processus</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une approche méthodique pour assurer la qualité et la satisfaction client à chaque étape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "Analyse de vos besoins et de votre environnement spécifique"
                },
                {
                  step: "02",
                  title: "Planification",
                  description: "Élaboration d'un plan d'action détaillé et personnalisé"
                },
                {
                  step: "03",
                  title: "Exécution",
                  description: "Mise en œuvre professionnelle par des techniciens certifiés"
                },
                {
                  step: "04",
                  title: "Suivi",
                  description: "Évaluation continue et support après installation"
                }
              ].map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-primary/10 rounded-xl p-6 h-full">
                    <div className="text-3xl font-bold text-primary mb-4">{process.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à améliorer votre infrastructure de recharge ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques et découvrir comment nous pouvons vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/services/installation">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
