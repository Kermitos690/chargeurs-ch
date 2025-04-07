
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Smartphone, Globe, CloudSync, Lock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Connectivity = () => {
  const connectivityFeatures = [
    {
      icon: <Smartphone className="h-12 w-12 text-electric-blue" />,
      title: "Application Mobile",
      description: "Contrôlez et surveillez votre borne de recharge à distance, recevez des notifications et accédez à vos données de recharge."
    },
    {
      icon: <CloudSync className="h-12 w-12 text-electric-blue" />,
      title: "Mises à jour automatiques",
      description: "Votre borne reste toujours à jour avec les dernières fonctionnalités et améliorations de sécurité grâce aux mises à jour over-the-air."
    },
    {
      icon: <Wifi className="h-12 w-12 text-electric-blue" />,
      title: "Connectivité multiple",
      description: "Wi-Fi, Ethernet et 4G pour une connexion constante, même dans les zones à faible couverture réseau."
    },
    {
      icon: <Globe className="h-12 w-12 text-electric-blue" />,
      title: "Réseau interconnecté",
      description: "Accédez à plus de 200'000 points de recharge à travers l'Europe avec une seule application et une facturation unifiée."
    },
    {
      icon: <Lock className="h-12 w-12 text-electric-blue" />,
      title: "Authentification sécurisée",
      description: "Identification par carte RFID, QR code ou reconnaissance automatique du véhicule pour une expérience sans friction."
    },
    {
      icon: <Share2 className="h-12 w-12 text-electric-blue" />,
      title: "Partage et monétisation",
      description: "Partagez facilement votre borne avec votre entourage ou rentabilisez-la en la rendant publique via notre plateforme."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Connectivité Intelligente</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des bornes connectées qui s'intègrent parfaitement dans votre quotidien numérique et vous offrent une expérience de recharge sans effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Votre borne dans votre poche</h2>
            <p className="text-lg mb-8">
              Notre application mobile vous permet de contrôler tous les aspects de votre expérience de recharge, où que vous soyez et quand vous le souhaitez.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-electric-blue/10 p-1 mt-1 mr-3">
                  <Smartphone className="h-5 w-5 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Contrôle à distance</h3>
                  <p className="text-muted-foreground">Démarrez, arrêtez ou programmez vos sessions de recharge à distance.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-electric-blue/10 p-1 mt-1 mr-3">
                  <CloudSync className="h-5 w-5 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Synchronisation cloud</h3>
                  <p className="text-muted-foreground">Toutes vos données sont automatiquement synchronisées et accessibles sur tous vos appareils.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-electric-blue/10 p-1 mt-1 mr-3">
                  <Lock className="h-5 w-5 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Sécurité avancée</h3>
                  <p className="text-muted-foreground">Authentification biométrique et chiffrement de bout en bout pour protéger vos données.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="bg-electric-blue hover:bg-electric-blue/90">
                Télécharger l'application
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6" 
              alt="Application mobile de recharge" 
              className="w-full h-auto"
            />
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
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-xl overflow-hidden py-12 px-8 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Essayez notre application</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Téléchargez notre application pour découvrir comment la connectivité intelligente peut transformer votre expérience de recharge électrique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="M18 14v4h4"/><path d="M18 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>
              App Store
            </Button>
            <Button variant="secondary" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
              Google Play
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes sur la connectivité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">La borne fonctionne-t-elle sans connexion internet ?</h3>
              <p className="text-muted-foreground">Oui, nos bornes peuvent fonctionner en mode autonome. Cependant, certaines fonctionnalités avancées comme les mises à jour ou la facturation automatique nécessitent une connexion.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Comment les données de recharge sont-elles protégées ?</h3>
              <p className="text-muted-foreground">Toutes les données sont chiffrées de bout en bout et stockées de manière sécurisée conformément aux normes RGPD. Nous ne partageons jamais vos informations sans votre consentement.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Puis-je intégrer ma borne à mon système domotique ?</h3>
              <p className="text-muted-foreground">Absolument ! Nos bornes sont compatibles avec les principaux systèmes domotiques comme HomeKit, Google Home et Amazon Alexa pour une intégration parfaite dans votre maison intelligente.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="font-medium mb-2">Comment fonctionne le partage de borne ?</h3>
              <p className="text-muted-foreground">Vous pouvez facilement partager l'accès à votre borne via l'application. Définissez des plages horaires, des tarifs personnalisés et suivez l'utilisation en temps réel.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Connectivity;
