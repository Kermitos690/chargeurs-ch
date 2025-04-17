
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BatteryCharging, Heart, Shield, Leaf, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-green-50 py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">Notre Histoire</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Découvrez comment Chargeurs.ch est devenu le leader suisse des solutions de recharge mobile.
                Notre mission est de vous garder connecté, partout et à tout moment.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Mission */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
                <p className="text-muted-foreground mb-4">
                  Chez Chargeurs.ch, nous croyons en un monde où personne ne devrait jamais se retrouver 
                  sans batterie. Notre mission est de fournir des solutions de recharge accessibles, 
                  durables et fiables à tous les Suisses.
                </p>
                <p className="text-muted-foreground mb-6">
                  Nous nous engageons à réduire l'anxiété liée à la batterie et à permettre à chacun 
                  de rester connecté sans interruption, peu importe où ils se trouvent.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="h-5 w-5 text-green-600" />
                    <span>Toujours chargé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-green-600" />
                    <span>Service client d'excellence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Fiabilité et sécurité</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Notre équipe en action" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="bg-muted py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Durabilité</h3>
                    <p className="text-muted-foreground">
                      Nos powerbanks sont conçues pour durer et être réutilisées, réduisant ainsi les déchets électroniques.
                      Nous utilisons également des matériaux recyclés dans nos emballages.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                    <p className="text-muted-foreground">
                      Nous nous efforçons d'offrir une qualité irréprochable dans tous nos produits et services.
                      La satisfaction client est notre priorité absolue.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Communauté</h3>
                    <p className="text-muted-foreground">
                      Nous croyons au pouvoir de la communauté et nous travaillons en étroite collaboration
                      avec les entreprises locales et les municipalités pour étendre notre réseau.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Notre Histoire</h2>
              
              <div className="space-y-12">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="bg-primary text-white font-bold rounded py-1">2018</div>
                    <div className="h-full border-r-2 border-primary mx-auto w-0 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Les débuts</h3>
                    <p className="text-muted-foreground">
                      Fondée par trois ingénieurs passionnés, Chargeurs.ch est née de la frustration de toujours manquer de batterie
                      lors de sorties ou de voyages. La première station a été installée à Lausanne.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="bg-primary text-white font-bold rounded py-1">2020</div>
                    <div className="h-full border-r-2 border-primary mx-auto w-0 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expansion nationale</h3>
                    <p className="text-muted-foreground">
                      Après un succès initial, nous avons étendu notre réseau à Genève, Zurich et Berne,
                      avec plus de 100 stations de recharge dans toute la Suisse.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="bg-primary text-white font-bold rounded py-1">2022</div>
                    <div className="h-full border-r-2 border-primary mx-auto w-0 mt-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Innovation technologique</h3>
                    <p className="text-muted-foreground">
                      Lancement de notre application mobile pour localiser les stations et introduction
                      de powerbanks de nouvelle génération avec une capacité accrue et une charge rapide.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="bg-primary text-white font-bold rounded py-1">2024</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Aujourd'hui</h3>
                    <p className="text-muted-foreground">
                      Avec plus de 500 stations et 50 000 utilisateurs réguliers, Chargeurs.ch est devenu
                      le leader incontesté des solutions de recharge mobile en Suisse, avec des projets d'expansion européenne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white py-16">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez l'aventure</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Découvrez nos services et commencez à utiliser notre réseau de powerbanks dès aujourd'hui.
              Restez chargé, restez connecté !
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => navigate('/location')} 
                variant="secondary" 
                size="lg"
              >
                Louer une powerbank
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline" 
                className="bg-transparent text-white hover:bg-white hover:text-primary"
                size="lg"
              >
                Contactez-nous
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
