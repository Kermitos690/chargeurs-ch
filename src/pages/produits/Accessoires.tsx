
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { accessories } from '@/data/accessories';
import AccessoryCard from '@/components/produits/accessoires/AccessoryCard';
import ServicesSection from '@/components/produits/accessoires/ServicesSection';
import UsageTipsSection from '@/components/produits/accessoires/UsageTipsSection';
import HelpSection from '@/components/produits/accessoires/HelpSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProduitsAccessoires = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 md:pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessoires de Recharge</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Découvrez notre gamme complète d'accessoires pour optimiser et faciliter 
              la recharge de votre véhicule électrique au quotidien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild>
                <Link to="/produits">
                  Voir tous nos produits
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Demander un conseil
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {accessories.map(item => (
              <AccessoryCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="flex justify-center mb-16">
            <Button size="lg" className="group" asChild>
              <Link to="/shop/products">
                Voir plus d'accessoires
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <ServicesSection />
          <UsageTipsSection />
          <HelpSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsAccessoires;
