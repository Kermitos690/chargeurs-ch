
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryCharging, Shield, Zap, Smartphone, Timer, CheckCircle, LightbulbIcon, BadgeInfo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PowerBanks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">Nos Powerbanks</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Découvrez notre gamme de powerbanks, conçues pour être durables,
                rapides et adaptées à tous vos appareils mobiles.
              </p>
              <Button onClick={() => navigate('/location')} size="lg">
                Louer une powerbank
              </Button>
            </div>
          </div>
        </section>

        {/* Caractéristiques des Powerbanks */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Caractéristiques principales</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BatteryCharging className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Grande capacité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos powerbanks offrent une capacité de 10 000 mAh, suffisante pour recharger
                    entièrement votre smartphone 2 à 3 fois.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Charge rapide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Équipées de la technologie de charge rapide, nos powerbanks peuvent recharger
                    votre appareil jusqu'à 50% en seulement 30 minutes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Compatibilité universelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compatibles avec tous les appareils mobiles grâce aux ports USB-C, Lightning et USB-A.
                    Rechargez n'importe quel appareil, n'importe où.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Types de Powerbanks */}
        <section className="bg-muted py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nos modèles</h2>
            
            <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="pro">Pro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="standard" className="mt-0">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative aspect-video bg-green-100">
                    <img 
                      src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Powerbank Standard" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Powerbank Standard</h3>
                    <p className="text-muted-foreground mb-4">
                      Notre modèle le plus populaire, parfait pour une utilisation quotidienne.
                      Compact et léger, idéal pour les déplacements urbains.
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>10 000 mAh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>1 port USB-C, 1 port USB-A</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Charge rapide 18W</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Design compact</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button onClick={() => navigate('/location')}>
                        Louer maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="premium" className="mt-0">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative aspect-video bg-blue-100">
                    <img 
                      src="https://images.unsplash.com/photo-1589923188651-268a357899e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Powerbank Premium" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Premium
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Powerbank Premium</h3>
                    <p className="text-muted-foreground mb-4">
                      Pour les utilisateurs exigeants. Plus puissant, plus rapide et avec une capacité accrue
                      pour répondre à tous vos besoins de recharge.
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>20 000 mAh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>2 ports USB-C, 1 port USB-A</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Charge rapide 30W</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Indicateur LED de charge</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button onClick={() => navigate('/location')}>
                        Louer maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pro" className="mt-0">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative aspect-video bg-purple-100">
                    <img 
                      src="https://images.unsplash.com/photo-1603539444875-76e7684265f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Powerbank Pro" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Pro
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Powerbank Pro</h3>
                    <p className="text-muted-foreground mb-4">
                      Notre modèle haut de gamme avec des fonctionnalités avancées. Idéal pour les professionnels
                      et les voyageurs qui ont besoin d'une solution complète.
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>26 800 mAh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>2 ports USB-C, 2 ports USB-A</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Charge rapide 60W</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Écran LCD avec informations détaillées</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Charge sans fil 15W intégrée</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button onClick={() => navigate('/location')}>
                        Louer maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Trouvez une station</h3>
                <p className="text-muted-foreground">
                  Localisez la station la plus proche via notre application ou notre site web.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Louez une powerbank</h3>
                <p className="text-muted-foreground">
                  Scannez le QR code ou utilisez notre application pour déverrouiller une powerbank.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Utilisez-la partout</h3>
                <p className="text-muted-foreground">
                  Restez chargé où que vous soyez. Aucune limite de temps ou de distance.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold mb-2">Retournez-la</h3>
                <p className="text-muted-foreground">
                  Déposez la powerbank dans n'importe quelle station de notre réseau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Garantie et sécurité */}
        <section className="bg-green-50 py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center mb-8">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Garantie et sécurité</h2>
                <p className="text-lg text-muted-foreground">
                  Nos powerbanks sont conçues avec les plus hauts standards de qualité et de sécurité.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <LightbulbIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Technologie intelligente</h3>
                        <p className="text-muted-foreground">
                          Nos powerbanks sont équipées de systèmes de protection contre la surcharge,
                          la surchauffe et les courts-circuits pour garantir une utilisation en toute sécurité.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Timer className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Durabilité</h3>
                        <p className="text-muted-foreground">
                          Conçues pour durer, nos powerbanks conservent plus de 90% de leur capacité même après
                          500 cycles de charge/décharge complets.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <BadgeInfo className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Certifications</h3>
                        <p className="text-muted-foreground">
                          Toutes nos powerbanks sont certifiées CE, FCC et RoHS, garantissant le respect des
                          normes internationales les plus strictes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Garantie limitée</h3>
                        <p className="text-muted-foreground">
                          Les powerbanks sont garanties 12 mois dans le cadre d'une utilisation normale.
                          Notre service client est disponible pour vous aider en cas de problème.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Prêt à rester chargé ?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Louez une powerbank dès aujourd'hui et ne vous souciez plus jamais de votre batterie.
                Des milliers d'utilisateurs nous font déjà confiance !
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => navigate('/location')} size="lg">
                  Louer maintenant
                </Button>
                <Button onClick={() => navigate('/stations')} variant="outline" size="lg">
                  Trouver une station
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PowerBanks;
