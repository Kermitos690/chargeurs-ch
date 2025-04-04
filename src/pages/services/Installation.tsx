import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Wrench, Calendar, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesInstallation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Services d'Installation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une installation professionnelle et sécurisée de votre borne de recharge, réalisée par des techniciens certifiés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="glass-panel rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Installation d'une borne de recharge" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Une installation sur mesure</h2>
              <p className="text-muted-foreground mb-6">
                L'installation d'une borne de recharge nécessite l'intervention d'un professionnel qualifié pour garantir la sécurité et la conformité de votre installation. Nos techniciens certifiés s'occupent de tout, de l'étude technique à la mise en service.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Installation par des techniciens certifiés</span>
                    <p className="text-sm text-muted-foreground mt-1">Tous nos techniciens sont formés et certifiés pour l'installation de bornes de recharge.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Délais d'installation rapides</span>
                    <p className="text-sm text-muted-foreground mt-1">Installation sous 5 à 10 jours ouvrés après validation de votre commande.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Garantie et conformité</span>
                    <p className="text-sm text-muted-foreground mt-1">Installation conforme aux normes en vigueur avec certificat de conformité.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Notre Processus d'Installation</h2>
            <div className="relative overflow-hidden">
              <div className="absolute top-8 left-[14px] bottom-8 w-1 bg-primary/30 lg:left-1/2 lg:-ml-px"></div>
              <div className="space-y-12">
                {[
                  {
                    icon: <FileText className="h-6 w-6 text-primary" />,
                    title: "Étude technique",
                    description: "Un technicien évalue votre installation électrique et les travaux nécessaires à distance ou lors d'une visite technique.",
                    extras: [
                      "Analyse de votre tableau électrique",
                      "Évaluation de la puissance disponible",
                      "Identification de l'emplacement optimal",
                      "Détection des contraintes spécifiques"
                    ]
                  },
                  {
                    icon: <Calendar className="h-6 w-6 text-primary" />,
                    title: "Proposition et planification",
                    description: "Nous vous proposons une solution adaptée à vos besoins et planifions l'installation à votre convenance.",
                    extras: [
                      "Devis détaillé sans surprise",
                      "Choix de la date d'intervention",
                      "Préparation du matériel nécessaire",
                      "Confirmation par email"
                    ]
                  },
                  {
                    icon: <Wrench className="h-6 w-6 text-primary" />,
                    title: "Installation",
                    description: "Nos techniciens certifiés réalisent l'installation dans les règles de l'art, en respectant toutes les normes de sécurité.",
                    extras: [
                      "Installation du câblage nécessaire",
                      "Pose et raccordement de la borne",
                      "Configuration du système",
                      "Tests de sécurité complets"
                    ]
                  },
                  {
                    icon: <Settings className="h-6 w-6 text-primary" />,
                    title: "Mise en service et formation",
                    description: "Nous mettons en service votre borne, vérifions son bon fonctionnement et vous expliquons comment l'utiliser.",
                    extras: [
                      "Vérification complète du système",
                      "Démonstration d'utilisation",
                      "Remise du guide utilisateur",
                      "Conseils personnalisés"
                    ]
                  }
                ].map((step, index) => (
                  <div key={index} className="relative lg:flex items-center justify-between">
                    <div className={`absolute top-8 left-4 w-8 h-8 rounded-full z-10 flex items-center justify-center bg-primary text-white lg:left-1/2 lg:-ml-4 lg:-mt-4`}>
                      {index + 1}
                    </div>
                    <div className={`ml-16 pb-8 lg:w-5/12 lg:ml-0 lg:pb-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:ml-auto'}`}>
                      <div className="bg-card border rounded-lg p-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 lg:ml-auto">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="space-y-1">
                          {step.extras.map((extra, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{extra}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index % 2 === 0 && (
                      <div className="hidden lg:block lg:w-5/12"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Nos Forfaits d'Installation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous proposons plusieurs forfaits d'installation pour répondre à vos besoins et à votre budget.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Installation Standard",
                  price: "CHF 990",
                  description: "Pour une installation simple et standard",
                  features: [
                    "Installation murale d'une borne résidentielle",
                    "Jusqu'à 5 mètres de câblage",
                    "Raccordement au tableau électrique existant",
                    "Tests et mise en service",
                    "Certification de l'installation"
                  ]
                },
                {
                  title: "Installation Premium",
                  price: "CHF 1490",
                  description: "Pour une installation plus complexe",
                  features: [
                    "Installation murale ou sur pied",
                    "Jusqu'à 15 mètres de câblage",
                    "Mise à niveau du tableau électrique si nécessaire",
                    "Programmation avancée des fonctionnalités",
                    "Formation approfondie à l'utilisation",
                    "Garantie d'intervention sous 48h pendant 1 an"
                  ],
                  highlighted: true
                },
                {
                  title: "Installation Sur Mesure",
                  price: "Sur devis",
                  description: "Pour les installations spécifiques ou complexes",
                  features: [
                    "Étude technique approfondie",
                    "Solutions personnalisées",
                    "Travaux de génie civil si nécessaire",
                    "Intégration avec système photovoltaïque",
                    "Mise en place de systèmes de gestion de l'énergie",
                    "Suivi et optimisation post-installation"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`flex flex-col h-full ${plan.highlighted ? 'border-primary shadow-lg' : ''}`}>
                  {plan.highlighted && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                      Le plus populaire
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-2xl font-bold mt-2">{plan.price}</div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                      Choisir ce forfait
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Questions Fréquentes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Vous avez des questions sur l'installation ? Consultez nos réponses aux questions les plus fréquentes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Combien de temps prend l'installation ?",
                  answer: "Une installation standard prend généralement entre 2 et 4 heures. Pour les installations plus complexes, cela peut prendre une journée entière."
                },
                {
                  question: "Faut-il modifier mon tableau électrique ?",
                  answer: "Cela dépend de votre installation existante. Dans certains cas, une mise à niveau du tableau électrique peut être nécessaire. Notre technicien l'évaluera lors de l'étude technique."
                },
                {
                  question: "Puis-je installer ma borne moi-même ?",
                  answer: "Pour des raisons de sécurité et de garantie, nous recommandons fortement de faire appel à un professionnel certifié. Une installation incorrecte peut être dangereuse et annuler la garantie de votre borne."
                },
                {
                  question: "Quelles sont les normes à respecter ?",
                  answer: "L'installation doit respecter les normes électriques en vigueur (SIA 2060, OIBT) ainsi que les recommandations du fabricant. Nos techniciens sont formés pour respecter toutes ces exigences."
                },
                {
                  question: "La borne doit-elle être installée à l'intérieur ou à l'extérieur ?",
                  answer: "Cela dépend de votre configuration et de vos préférences. Nos bornes peuvent être installées à l'intérieur comme à l'extérieur, avec des indices de protection adaptés aux différents environnements."
                },
                {
                  question: "Comment prendre rendez-vous pour l'installation ?",
                  answer: "Vous pouvez prendre rendez-vous en ligne via notre formulaire de contact, par téléphone ou en passant directement votre commande. Nous vous contacterons ensuite pour planifier l'intervention."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Prêt à installer votre borne de recharge ?</h3>
              <p className="opacity-90">
                Contactez-nous pour une étude personnalisée ou prenez directement rendez-vous pour une installation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary" size="lg" asChild>
                <Link to="/appointment">Prendre rendez-vous</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesInstallation;
