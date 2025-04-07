
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Zap, Clock, Shield, BarChart4, Settings } from 'lucide-react';

const Charging = () => {
  const chargingFeatures = [
    {
      icon: <Zap className="h-12 w-12 text-electric-blue" />,
      title: "Recharge Ultra-Rapide",
      description: "Notre technologie permet une recharge jusqu'à 80% en moins de 30 minutes pour la plupart des smartphones et tablettes."
    },
    {
      icon: <Battery className="h-12 w-12 text-electric-blue" />,
      title: "Compatible avec tous les appareils",
      description: "Nos powerbanks sont compatibles avec tous les types de smartphones: iPhone, Samsung, Xiaomi, Huawei et bien d'autres."
    },
    {
      icon: <Clock className="h-12 w-12 text-electric-blue" />,
      title: "Planification intelligente",
      description: "Programmez vos sessions de recharge aux heures qui vous conviennent grâce à notre application mobile intuitive."
    },
    {
      icon: <Shield className="h-12 w-12 text-electric-blue" />,
      title: "Sécurité maximale",
      description: "Systèmes de protection intégrés contre les surtensions, court-circuits et surchauffes pour protéger vos appareils."
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
            Découvrez notre technologie de pointe pour une recharge rapide, fiable et adaptée à tous les appareils mobiles.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">La puissance quand vous en avez besoin</h2>
                <p className="mb-6">
                  Nos powerbanks délivrent une puissance optimale, permettant de récupérer rapidement l'autonomie de votre smartphone ou tablette, où que vous soyez.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Jusqu'à 30W de puissance</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Compatible avec tous les smartphones modernes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <span>Régulation intelligente de la charge</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f" 
                  alt="Powerbank en charge" 
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
          <h2 className="text-3xl font-bold mb-4">Comparez nos solutions de powerbanks</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Trouvez la solution qui correspond le mieux à vos besoins, que vous soyez un particulier ou une entreprise.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted-foreground/10">
                  <th className="p-4 text-left">Caractéristiques</th>
                  <th className="p-4 text-center">Standard</th>
                  <th className="p-4 text-center">Premium</th>
                  <th className="p-4 text-center">Ultra</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Capacité</td>
                  <td className="p-4 text-center">5'000 mAh</td>
                  <td className="p-4 text-center">10'000 mAh</td>
                  <td className="p-4 text-center">20'000 mAh</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Temps de recharge (smartphone)</td>
                  <td className="p-4 text-center">~1 heure</td>
                  <td className="p-4 text-center">~45 minutes</td>
                  <td className="p-4 text-center">~30 minutes</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Utilisation idéale</td>
                  <td className="p-4 text-center">Usage occasionnel</td>
                  <td className="p-4 text-center">Usage régulier</td>
                  <td className="p-4 text-center">Voyageurs et professionnels</td>
                </tr>
                <tr className="border-b border-muted-foreground/20">
                  <td className="p-4 font-medium">Prix indicatif (location/jour)</td>
                  <td className="p-4 text-center">2 CHF</td>
                  <td className="p-4 text-center">3 CHF</td>
                  <td className="p-4 text-center">5 CHF</td>
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
