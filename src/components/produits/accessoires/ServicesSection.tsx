
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ServicesSection: React.FC = () => {
  return (
    <div className="bg-muted p-8 rounded-xl mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Services associés</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
          <p className="text-muted-foreground mb-4">
            Livraison en 24-48h dans toute la Suisse pour les accessoires en stock.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline">Gratuite dès 100 CHF</Badge>
          </div>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Installation sur site</h3>
          <p className="text-muted-foreground mb-4">
            Nos techniciens peuvent installer vos accessoires à votre domicile ou sur votre lieu de travail.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline">Sur devis</Badge>
          </div>
        </div>
        <div className="bg-card border p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Extension de garantie</h3>
          <p className="text-muted-foreground mb-4">
            Prolongez la garantie de vos accessoires jusqu'à 5 ans pour une tranquillité totale.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline">À partir de 29 CHF</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
