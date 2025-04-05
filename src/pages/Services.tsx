
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BatteryCharging, 
  Zap, 
  Home, 
  Building2, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Sparkles,
  Clock,
  CheckCircle,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Nos Services de Recharge Électrique
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Des solutions complètes pour répondre à tous vos besoins en matière de recharge de véhicules électriques
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Solutions Adaptées à Chaque Besoin
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Résidentiel */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Installation Résidentielle</h3>
                  <p className="text-gray-600 mb-4">
                    Solutions de recharge optimisées pour les maisons individuelles et les immeubles résidentiels.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Installation de bornes domestiques</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Configuration Wi-Fi et smart charging</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Intégration avec panneaux solaires</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Entreprises */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Solutions Entreprises</h3>
                  <p className="text-gray-600 mb-4">
                    Équipez votre entreprise de bornes de recharge pour vos employés et visiteurs.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Bornes multi-utilisateurs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Système de paiement intégré</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Gestion de flotte électrique</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Publique */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Infrastructures Publiques</h3>
                  <p className="text-gray-600 mb-4">
                    Déployez des stations de recharge dans les espaces publics ou commerciaux.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Bornes rapides et ultra-rapides</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Solutions de monétisation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Intégration aux réseaux nationaux</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-black">
            Notre Processus d'Installation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Consultation</h3>
              <p className="text-gray-600">
                Évaluation de vos besoins et analyse technique de votre installation électrique existante.
              </p>
              
              {/* Connector line */}
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Proposition</h3>
              <p className="text-gray-600">
                Recommandation des meilleures solutions adaptées à vos besoins et budget.
              </p>
              
              {/* Connector line */}
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Installation</h3>
              <p className="text-gray-600">
                Mise en place professionnelle par nos techniciens certifiés avec respect des normes.
              </p>
              
              {/* Connector line */}
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Suivi</h3>
              <p className="text-gray-600">
                Maintenance et assistance technique continue pour assurer un fonctionnement optimal.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Pourquoi Choisir Nos Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Expertise Certifiée</h3>
              <p className="text-gray-600">
                Nos techniciens sont formés et certifiés pour toutes les installations électriques selon les normes suisses.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Service Rapide</h3>
              <p className="text-gray-600">
                Installation rapide et efficace avec des délais respectés et une planification adaptée à vos contraintes.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Solutions Innovantes</h3>
              <p className="text-gray-600">
                Nous proposons les technologies les plus récentes pour une recharge intelligente et économique.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Ce Que Disent Nos Clients
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1 mb-4">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "Installation parfaite pour ma Tesla Model 3. L'équipe a été très professionnelle et l'installation a été faite en moins de 3 heures."
                  </p>
                  <div className="mt-auto">
                    <p className="font-semibold text-black">Marc Dupont</p>
                    <p className="text-gray-500 text-sm">Genève</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1 mb-4">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "Nous avons équipé notre entreprise de 5 bornes pour notre flotte. Service impeccable et conseils précieux pour optimiser notre installation."
                  </p>
                  <div className="mt-auto">
                    <p className="font-semibold text-black">Sophie Laurent</p>
                    <p className="text-gray-500 text-sm">Directrice, Eco Solutions SA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1 mb-4">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "La borne de recharge installée dans notre copropriété fonctionne parfaitement. Le service client est très réactif quand nous avons des questions."
                  </p>
                  <div className="mt-auto">
                    <p className="font-semibold text-black">Jean Muller</p>
                    <p className="text-gray-500 text-sm">Lausanne</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Prêt à Passer à l'Électrique ?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins en matière de recharge électrique
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Nous contacter
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-primary/80">
              <Link to="/services/installation">
                En savoir plus
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
