
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Smartphone, Globe, CloudSun, Share2, Router } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Connectivity = () => {
  const connectivityFeatures = [
    {
      icon: <Wifi className="h-12 w-12 text-primary" />,
      title: "Connectivité Wi-Fi intégrée",
      description: "Connectez votre powerbank à votre réseau Wi-Fi pour un suivi en temps réel et des mises à jour automatiques.",
      action: "/produits/premium"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: "Application Mobile Intuitive",
      description: "Contrôlez votre powerbank, suivez votre consommation et planifiez vos recharges depuis votre smartphone.",
      action: "/contact"
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Accès Web Sécurisé",
      description: "Gérez votre compte et vos locations depuis n'importe quel navigateur avec notre interface web sécurisée.",
      action: "/login"
    },
    {
      icon: <CloudSun className="h-12 w-12 text-primary" />,
      title: "Synchronisation Cloud",
      description: "Sauvegarde automatique de vos données et préférences dans le cloud pour une expérience fluide sur tous vos appareils.",
      action: "/produits"
    },
    {
      icon: <Share2 className="h-12 w-12 text-primary" />,
      title: "Partage Familial",
      description: "Partagez l'accès à vos powerbanks avec les membres de votre famille via des comptes secondaires.",
      action: "/register"
    },
    {
      icon: <Router className="h-12 w-12 text-primary" />,
      title: "Connectivité 4G/5G",
      description: "Option de connectivité cellulaire pour une connexion fiable même sans Wi-Fi disponible.",
      action: "/produits/premium"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Connectivité Intelligente</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nos powerbanks sont entièrement connectées pour vous offrir un contrôle total, des analyses détaillées et une expérience utilisateur optimale.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/produits">Découvrir nos produits connectés</Link>
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Restez connecté à tout moment</h2>
                <p className="mb-6">
                  Notre écosystème connecté vous permet de contrôler et surveiller vos powerbanks à distance, de recevoir des notifications en temps réel et d'optimiser votre consommation d'énergie.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Connectivité Wi-Fi et 4G/5G</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Application mobile iOS et Android</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Mises à jour automatiques à distance</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/contact">Demander une démo</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1605648916361-9bc12ad6a569" 
                  alt="Application mobile de contrôle de powerbank" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {connectivityFeatures.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                <Button variant="outline" asChild className="w-full mt-2 hover:bg-primary/5 hover:text-primary">
                  <Link to={feature.action}>En savoir plus</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-xl p-8 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Compatible avec votre maison intelligente</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Intégrez vos powerbanks avec vos autres appareils connectés pour une expérience domotique complète.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Apple_HomeKit_logo.svg/1200px-Apple_HomeKit_logo.svg.png" alt="Apple HomeKit" className="max-h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Works_With_Google_Assistant_badge.svg/1200px-Works_With_Google_Assistant_badge.svg.png" alt="Google Assistant" className="max-h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Alexa_actionable_notifications_icon.svg/1200px-Alexa_actionable_notifications_icon.svg.png" alt="Amazon Alexa" className="max-h-12" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/IFTTT_Logo.svg/1200px-IFTTT_Logo.svg.png" alt="IFTTT" className="max-h-12" />
            </div>
          </div>
          <Button asChild>
            <Link to="/produits">Découvrir nos produits compatibles</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Connectivity;
