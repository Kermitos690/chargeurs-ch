
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessoryCard from '@/components/produits/AccessoryCard';
import AssociatedServices from '@/components/produits/AssociatedServices';
import UsageTips from '@/components/produits/UsageTips';
import HelpSection from '@/components/produits/HelpSection';
import { accessories } from '@/data/accessories';

const ProduitsAccessoires = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessoires de Recharge</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre gamme complète d'accessoires pour optimiser et faciliter 
              la recharge de votre véhicule électrique au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {accessories.map(accessory => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>

          <AssociatedServices />
          <UsageTips />
          <HelpSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProduitsAccessoires;
