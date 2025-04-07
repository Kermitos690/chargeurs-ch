
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Zap, Clock, Shield, BarChart4, Settings } from 'lucide-react';

const Charging = () => {
  const chargingFeatures = [
    {
      icon: <Zap className="h-12 w-12 text-electric-blue" />,
      title: "Recharge Ultra-Rapide",
      description: "Notre technologie permet une recharge jusqu'à 80% en moins de 30 minutes pour la plupart des véhicules électriques compatibles."
    },
    {
      icon: <Battery className="h-12 w-12 text-electric-blue" />,
      title: "Compatible avec tous les véhicules",
      description: "Nos bornes sont compatibles avec tous les standards de recharge: Type 2, CCS, CHAdeMO et Tesla avec adaptateur."
    },
    {
      icon: <Clock className="h-12 w-12 text-electric-blue" />,
      title: "Planification intelligente",
      description: "Programmez vos sessions de recharge aux heures creuses pour économiser sur vos factures d'électricité."
    },
    {
      icon: <Shield className="h-12 w-12 text-electric-blue" />,
      title: "Sécurité maximale",
      description: "Systèmes de protection intégrés contre les surtensions, court-circuits et conditions météorologiques extrêmes."
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-electric-blue" />,
      title: "Analyse de consommation",
      description: "Suivez et optimisez votre consommation d'énergie grâce à des rapports détaillés et personnalisés."
    },
    {
      icon: <Settings className="h-12 w-12 text-electric-blue" />,
      title: "Maintenance prédictive",
      description: "Nos systèmes intelligents détectent les problèmes potentiels avant qu'ils n'affectent vos sessions de recharge."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Recharge Rapide et Efficace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre technologie de pointe pour une recharge rapide, fiable et adaptée à tous les véhicules électriques.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">La puissance quand vous en avez besoin</h2>
                <p className="mb-6">
                  Nos bornes de recharge rapide délivrent jusqu'à 350 kW de puissance, permettant de récupérer des centaines de kilomètres d'autonomie en quelques minutes seulement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Jusqu'à 350 kW de puissance</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Compatible avec tous les véhicules électriques</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Distribution intelligente de l'énergie</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1647833202303-5e48dbb8ad8c" 
                  alt="Borne de recharge rapide" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {chargingFeatures.map((feature, index) => (
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

        <div className="bg-muted rounded-xl p-8 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comparez nos solutions de recharge</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Trouvez la solution qui correspond le mieux à vos besoins, que vous soyez un particulier ou une entreprise.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted-foreground/10">
                  <th className="p-4 text-left">Caractéristiques</th>
                  <th className="p-4 text-center">Standard (AC)</th>
                  <th className="p-4 text-center">Rapide (DC)</th>
                  <th className="p-4 text-center">Ultra-Rapide (DC+)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Puissance</td>
                  <td className="p-4 text-center">7-22 kW</td>
                  <td className="p-4 text-center">50-175 kW</td>
                  <td className="p-4 text-center">175-350 kW</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Temps de recharge (0-80%)</td>
                  <td className="p-4 text-center">4-8 heures</td>
                  <td className="p-4 text-center">30-60 minutes</td>
                  <td className="p-4 text-center">15-30 minutes</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Utilisation idéale</td>
                  <td className="p-4 text-center">Domicile, bureau</td>
                  <td className="p-4 text-center">Centres commerciaux, parkings</td>
                  <td className="p-4 text-center">Stations-service, autoroutes</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Prix indicatif</td>
                  <td className="p-4 text-center">1'000 - 2'500 CHF</td>
                  <td className="p-4 text-center">20'000 - 50'000 CHF</td>
                  <td className="p-4 text-center">50'000 - 150'000 CHF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Charging;
