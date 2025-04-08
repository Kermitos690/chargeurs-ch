
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, AlertTriangle, Eye, FileCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Security = () => {
  const securityFeatures = [
    {
      icon: <Lock className="h-12 w-12 text-electric-blue" />,
      title: "Authentification sécurisée",
      description: "Système d'identification à double facteur pour protéger l'accès à vos powerbanks et à vos données personnelles."
    },
    {
      icon: <Shield className="h-12 w-12 text-electric-blue" />,
      title: "Protection électrique",
      description: "Protections intégrées contre les surtensions, les courts-circuits et les défauts d'isolation pour protéger vos smartphones."
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-electric-blue" />,
      title: "Détection d'anomalies",
      description: "Algorithmes qui détectent les comportements anormaux et peuvent interrompre la recharge en cas de problème."
    },
    {
      icon: <Eye className="h-12 w-12 text-electric-blue" />,
      title: "Surveillance 24/7",
      description: "Système de supervision permanent de notre réseau de powerbanks avec alertes en temps réel."
    },
    {
      icon: <FileCheck className="h-12 w-12 text-electric-blue" />,
      title: "Conformité réglementaire",
      description: "Conformité totale avec les normes européennes de sécurité électrique et de protection des données (RGPD)."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-electric-blue" />,
      title: "Paiements sécurisés",
      description: "Transactions protégées par chiffrement et conformes aux normes PCI-DSS pour la sécurité des paiements par carte."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Sécurité Avancée</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protection optimale pour vos smartphones, vos données et vos paiements grâce à nos systèmes de sécurité intégrés.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Protection à tous les niveaux</h2>
                <p className="mb-6">
                  Notre approche de la sécurité englobe à la fois la protection physique des powerbanks et la sécurisation des données et des transactions numériques.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-electric-blue/50 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Protection contre les surtensions et courts-circuits</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-electric-blue/50 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Chiffrement de bout en bout de vos données</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-electric-blue/50 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Authentification multi-facteurs pour les locations</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1633265486064-086b219458ec" 
                  alt="Sécurité des powerbanks" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted p-8 rounded-xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Notre engagement pour la sécurité</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="rounded-full bg-electric-blue/10 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-electric-blue" />
              </div>
              <h3 className="font-medium mb-2">Audit de sécurité</h3>
              <p className="text-muted-foreground">
                Tests d'intrusion réguliers par des experts indépendants pour garantir la robustesse de nos systèmes.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="rounded-full bg-electric-blue/10 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-electric-blue" />
              </div>
              <h3 className="font-medium mb-2">Certifications</h3>
              <p className="text-muted-foreground">
                Conformité avec les normes ISO 27001, CE, et autres certifications de sécurité internationales.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="rounded-full bg-electric-blue/10 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Eye className="h-8 w-8 text-electric-blue" />
              </div>
              <h3 className="font-medium mb-2">Surveillance continue</h3>
              <p className="text-muted-foreground">
                Équipe de sécurité dédiée qui surveille et répond aux menaces potentielles 24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-electric-blue text-white rounded-xl overflow-hidden py-12 px-8 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Découvrez notre guide de sécurité</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Téléchargez notre guide détaillant les meilleures pratiques pour la recharge sécurisée de vos smartphones.
          </p>
          <Button variant="secondary" size="lg">
            Télécharger le guide
          </Button>
        </div>

        <div className="bg-muted rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes sur la sécurité</h2>
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Les powerbanks présentent-elles des risques pour mon smartphone ?</h3>
              <p className="text-muted-foreground">Non, nos powerbanks intègrent plusieurs niveaux de protection qui assurent une recharge sécurisée pour votre smartphone. Des systèmes de contrôle surveillent en permanence les paramètres électriques pour prévenir tout dommage.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Comment mes données personnelles sont-elles protégées ?</h3>
              <p className="text-muted-foreground">Toutes les données sont chiffrées et stockées conformément au RGPD. Nous utilisons des technologies de chiffrement avancées et limitons strictement l'accès aux informations sensibles.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Que se passe-t-il en cas de tentative d'utilisation non autorisée ?</h3>
              <p className="text-muted-foreground">Notre système d'authentification empêche l'utilisation non autorisée. En cas de tentatives répétées d'accès, le système peut verrouiller temporairement la powerbank et vous envoyer une alerte immédiate.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Les bornes sont-elles sécurisées contre le vandalisme ?</h3>
              <p className="text-muted-foreground">Nos bornes sont conçues avec des matériaux robustes résistants au vandalisme. De plus, elles intègrent des capteurs qui détectent les tentatives d'effraction et alertent immédiatement notre centre de sécurité.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
