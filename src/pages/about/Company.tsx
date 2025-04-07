
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Company = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Notre Entreprise</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'histoire, la mission et les valeurs qui font de Chargeurs.ch un leader de la mobilité électrique en Suisse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
            <p className="text-lg mb-6">
              Chez Chargeurs.ch, notre vision est de construire un avenir où la mobilité électrique est accessible à tous, partout en Suisse. Nous croyons qu'un réseau de recharge fiable, pratique et abordable est essentiel pour accélérer la transition vers des transports plus durables.
            </p>
            <p className="text-lg mb-6">
              Notre objectif est de devenir le partenaire privilégié des particuliers, entreprises et collectivités pour tous leurs besoins en matière de recharge électrique, en offrant des solutions innovantes qui répondent aux défis d'aujourd'hui et de demain.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623" 
              alt="Bureaux de Chargeurs.ch" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none">
              <CardContent className="pt-6">
                <div className="rounded-full bg-electric-blue w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 9L12 5 2 9l10 4 10-4v6l-10 4-10-4v-6"></path><path d="M22 3l-10 4-10-4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Innovation</h3>
                <p className="text-center">
                  Nous cherchons constamment à repousser les limites technologiques pour offrir des solutions de recharge toujours plus performantes et intelligentes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-600 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Durabilité</h3>
                <p className="text-center">
                  Notre engagement envers l'environnement guide toutes nos décisions, de la conception de nos produits à notre fonctionnement quotidien.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-600 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="m3.29 7 8.21 4.66c.15.09.33.09.48 0L20.71 7"></path><path d="M12 22V12"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Qualité</h3>
                <p className="text-center">
                  Nous nous engageons à fournir des équipements et des services de la plus haute qualité, fiables et durables, pour une satisfaction client optimale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Chiffres clés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue mb-2">2018</div>
              <p className="text-muted-foreground">Fondation de l'entreprise</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue mb-2">50+</div>
              <p className="text-muted-foreground">Collaborateurs passionnés</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue mb-2">5000+</div>
              <p className="text-muted-foreground">Bornes installées</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue mb-2">100%</div>
              <p className="text-muted-foreground">Énergie verte</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3 bg-electric-blue text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Notre impact</h2>
            <p className="mb-6">
              Grâce à notre réseau de bornes de recharge alimentées à 100% par des énergies renouvelables, nous contribuons activement à la réduction des émissions de CO2 en Suisse.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold mb-1">50'000+</div>
                <p className="text-sm opacity-80">Tonnes de CO2 économisées</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">15 GWh</div>
                <p className="text-sm opacity-80">Énergie verte distribuée</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">30'000+</div>
                <p className="text-sm opacity-80">Utilisateurs réguliers</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">200+</div>
                <p className="text-sm opacity-80">Communes partenaires</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-xl overflow-hidden h-full">
            <img 
              src="https://images.unsplash.com/photo-1593941707882-a5bba53cbb7f" 
              alt="Impact environnemental" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Découvrez notre équipe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Rencontrez les passionnés qui travaillent chaque jour pour révolutionner l'infrastructure de recharge en Suisse.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/about/team">
              Notre équipe
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
