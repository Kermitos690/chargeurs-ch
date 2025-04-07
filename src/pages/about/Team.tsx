
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const executives = [
    {
      name: "Sophie Dubois",
      role: "Fondatrice & CEO",
      bio: "Ingénieure en électricité avec plus de 15 ans d'expérience dans le secteur de l'énergie. Sophie a fondé Chargeurs.ch en 2018 avec la vision de transformer l'infrastructure de recharge en Suisse.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "sophie.dubois@chargeurs.ch"
      }
    },
    {
      name: "Marc Keller",
      role: "Directeur Technique",
      bio: "Expert en systèmes embarqués et en réseaux électriques intelligents. Marc supervise le développement technique de nos solutions de recharge et dirige notre équipe d'ingénieurs.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "marc.keller@chargeurs.ch"
      }
    },
    {
      name: "Lucie Martin",
      role: "Directrice Marketing & Ventes",
      bio: "Forte de son expérience dans le marketing des technologies vertes, Lucie dirige nos stratégies de communication et de développement commercial.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "lucie.martin@chargeurs.ch"
      }
    }
  ];

  const teamMembers = [
    {
      name: "Thomas Weber",
      role: "Responsable R&D",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop"
    },
    {
      name: "Sarah Favre",
      role: "Ingénieure Logiciel",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
    },
    {
      name: "Michel Blanc",
      role: "Responsable des Opérations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "Emma Roth",
      role: "Cheffe de Projet",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop"
    },
    {
      name: "David Schmid",
      role: "Technicien Senior",
      image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=300&h=300&fit=crop"
    },
    {
      name: "Julie Moser",
      role: "Responsable Service Client",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=300&h=300&fit=crop"
    },
    {
      name: "Léo Garcia",
      role: "Développeur Frontend",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
    },
    {
      name: "Nadia Müller",
      role: "Spécialiste Marketing",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&h=300&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Notre Équipe</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les talents passionnés qui travaillent chaque jour pour révolutionner la mobilité électrique en Suisse.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Direction</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executives.map((exec, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={exec.image} 
                    alt={exec.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold">{exec.name}</h3>
                  <p className="text-sm text-electric-blue mb-3">{exec.role}</p>
                  <p className="text-muted-foreground mb-4">{exec.bio}</p>
                  <div className="flex space-x-3">
                    <a href={exec.socials.linkedin} className="text-muted-foreground hover:text-electric-blue transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={exec.socials.twitter} className="text-muted-foreground hover:text-electric-blue transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href={`mailto:${exec.socials.email}`} className="text-muted-foreground hover:text-electric-blue transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Notre Équipe</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-xl overflow-hidden py-16 px-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez notre équipe</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Vous êtes passionné par la mobilité électrique et souhaitez contribuer à un avenir plus durable ? Découvrez nos opportunités de carrière.
            </p>
            <a 
              href="/carrieres" 
              className="inline-block bg-white text-electric-blue font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Voir nos offres d'emploi
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Notre culture d'entreprise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Culture d'entreprise" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Un environnement de travail stimulant</h3>
              <p className="text-muted-foreground mb-4">
                Chez Chargeurs.ch, nous favorisons une culture de collaboration, d'innovation et de bien-être. Nous croyons que les meilleures idées émergent lorsque les équipes travaillent ensemble dans un environnement positif et inclusif.
              </p>
              <h3 className="text-xl font-semibold mb-4">Nos valeurs au quotidien</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-electric-blue"></div>
                  </div>
                  <span>Autonomie et responsabilisation des équipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-electric-blue"></div>
                  </div>
                  <span>Équilibre vie professionnelle/vie privée</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-electric-blue"></div>
                  </div>
                  <span>Formation continue et développement personnel</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-electric-blue"></div>
                  </div>
                  <span>Engagement social et environnemental</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Team;
