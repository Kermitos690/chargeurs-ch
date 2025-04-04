
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const Carrieres = () => {
  // Données des offres d'emploi (simulations)
  const jobs = [
    {
      title: "Technicien d'Installation",
      location: "Lausanne",
      type: "Temps plein",
      description: "Nous recherchons un technicien d'installation qualifié pour rejoindre notre équipe en pleine croissance. Vous serez responsable de l'installation et de la mise en service de bornes de recharge chez nos clients particuliers et professionnels.",
      requirements: [
        "Formation en électricité ou électrotechnique",
        "Expérience en installation électrique",
        "Permis de conduire",
        "Connaissance des normes électriques suisses",
        "Bon relationnel client"
      ]
    },
    {
      title: "Ingénieur en Électromobilité",
      location: "Genève",
      type: "Temps plein",
      description: "En tant qu'ingénieur en électromobilité, vous participerez à la conception et au développement de solutions innovantes pour nos clients. Vous serez impliqué dans toutes les phases des projets, de l'étude préliminaire à la mise en service.",
      requirements: [
        "Diplôme d'ingénieur en électrotechnique ou équivalent",
        "Expérience dans le domaine de l'électromobilité",
        "Maîtrise des logiciels de CAO",
        "Connaissance des protocoles de communication",
        "Français et anglais courants"
      ]
    },
    {
      title: "Chargé de Clientèle",
      location: "Lausanne",
      type: "Temps plein",
      description: "Nous recherchons un chargé de clientèle pour accompagner nos clients dans leurs projets d'électromobilité. Vous serez le point de contact privilégié pour nos clients et assurerez le suivi de leurs projets.",
      requirements: [
        "Formation commerciale ou technique",
        "Expérience en relation client",
        "Connaissance du secteur de l'énergie",
        "Excellentes capacités de communication",
        "Maîtrise des outils informatiques"
      ]
    }
  ];

  // Avantages de l'entreprise
  const benefits = [
    "Environnement de travail dynamique et innovant",
    "Formations continues et développement professionnel",
    "Participation à des projets d'avenir dans le domaine de la transition énergétique",
    "Horaires flexibles et possibilité de télétravail partiel",
    "Assurance maladie et accident complémentaire",
    "5 semaines de vacances",
    "Participation aux résultats de l'entreprise"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Rejoignez Notre Équipe</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participez à la transition énergétique et contribuez au développement de solutions de recharge innovantes pour les véhicules électriques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Pourquoi nous rejoindre ?</h2>
              <p className="text-muted-foreground mb-6">
                Chez Chargeurs.ch, nous sommes passionnés par l'innovation et engagés dans la transition énergétique. Rejoindre notre équipe, c'est participer à un projet d'avenir et contribuer à la construction d'un monde plus durable.
              </p>
              <p className="text-muted-foreground mb-6">
                Nous offrons un environnement de travail stimulant où chaque membre de l'équipe est encouragé à développer ses compétences et à prendre des initiatives. La collaboration, l'innovation et l'excellence sont au cœur de notre culture d'entreprise.
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold">Nos avantages :</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="glass-panel rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Équipe de Chargeurs.ch" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Nos offres d'emploi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Exigences :</h4>
                      <ul className="space-y-1 text-sm">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Postuler</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas le poste qui vous convient ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Nous sommes toujours à la recherche de talents passionnés. N'hésitez pas à nous envoyer une candidature spontanée.
            </p>
            <Button size="lg" className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Candidature spontanée
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Carrieres;
