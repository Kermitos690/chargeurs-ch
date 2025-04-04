
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Building, Users, Briefcase, CreditCard } from 'lucide-react';

const ProduitsEntreprises = () => {
  const solutions = [
    {
      title: "Flottes d'entreprise",
      icon: <Building className="h-6 w-6 text-primary" />,
      description: "Solutions adaptées aux entreprises disposant d'une flotte de véhicules électriques.",
      features: [
        "Bornes de recharge multiples",
        "Système de gestion centralisé",
        "Rapports de consommation détaillés",
        "Maintenance préventive",
        "Support dédié"
      ]
    },
    {
      title: "Parkings employés",
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Équipez votre parking d'entreprise pour permettre à vos employés de recharger leurs véhicules pendant les heures de travail.",
      features: [
        "Identification par badge d'entreprise",
        "Facturation automatisée",
        "Répartition intelligente de l'énergie",
        "Intégration aux systèmes RH",
        "Application mobile dédiée"
      ]
    },
    {
      title: "Clients et visiteurs",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      description: "Offrez un service de recharge à vos clients et visiteurs comme valeur ajoutée.",
      features: [
        "Paiement par carte ou application",
        "Système de réservation",
        "Bornes rapides (jusqu'à 150 kW)",
        "Visibilité sur les plateformes de recharge",
        "Design personnalisable aux couleurs de votre entreprise"
      ]
    },
    {
      title: "Location et leasing",
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      description: "Solutions financières flexibles pour équiper votre entreprise sans investissement initial important.",
      features: [
        "Contrats de 24 à 60 mois",
        "Maintenance incluse",
        "Options d'évolution technologique",
        "Déductibilité fiscale avantageuse",
        "Installation et formation incluses"
      ]
    }
  ];

  const benefits = [
    "Réduction de l'empreinte carbone de votre entreprise",
    "Amélioration de l'image de marque et de l'attractivité",
    "Fidélisation des employés et attraction de talents",
    "Conformité avec les nouvelles réglementations environnementales",
    "Économies sur les coûts de carburant à long terme",
    "Valorisation immobilière de vos bâtiments"
  ];

  const caseStudies = [
    {
      company: "TechInnovate SA",
      location: "Genève",
      challenge: "Équiper un nouveau siège social pour 200 employés dont 30% possèdent déjà des véhicules électriques.",
      solution: "Installation de 40 points de charge avec système d'équilibrage intelligent et intégration à l'infrastructure énergétique du bâtiment.",
      results: "Réduction de 45% des émissions de CO2 liées aux déplacements, satisfaction accrue des employés et distinction 'Entreprise verte' de la ville de Genève.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60"
    },
    {
      company: "Grand Hotel Lac",
      location: "Montreux",
      challenge: "Offrir un service de recharge premium aux clients de l'hôtel 5 étoiles.",
      solution: "10 bornes rapides dans le parking souterrain avec système de réservation intégré au processus de check-in de l'hôtel.",
      results: "Nouvelle source de revenus, augmentation de la satisfaction client et avantage concurrentiel décisif dans le secteur de l'hôtellerie de luxe.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Solutions pour Entreprises</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des solutions de recharge complètes et personnalisées pour accompagner 
              votre entreprise dans sa transition vers la mobilité électrique.
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

          <div className="bg-accent p-8 rounded-xl mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Les avantages pour votre entreprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-background p-4 rounded-lg shadow-sm flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Ils nous font confiance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48">
                    <img 
                      src={study.image} 
                      alt={study.company} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{study.company}</CardTitle>
                      <Badge variant="outline">{study.location}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Défi</h3>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Solution</h3>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Résultats</h3>
                        <p className="text-muted-foreground">{study.results}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Prêt à électrifier votre entreprise ?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Nos consultants spécialisés sont à votre disposition pour étudier vos besoins 
              et vous proposer une solution sur mesure adaptée à votre activité et à vos contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Demander une consultation</Button>
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

export default ProduitsEntreprises;
