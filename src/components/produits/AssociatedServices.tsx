
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ServiceProps {
  title: string;
  description: string;
  badgeText: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ title, description, badgeText }) => {
  return (
    <div className="bg-card border p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <div className="flex justify-center">
        <Badge variant="outline">{badgeText}</Badge>
      </div>
    </div>
  );
};

const AssociatedServices: React.FC = () => {
  const services = [
    {
      title: "Livraison rapide",
      description: "Livraison en 24-48h dans toute la Suisse pour les accessoires en stock.",
      badgeText: "Gratuite dès 100 CHF"
    },
    {
      title: "Installation sur site",
      description: "Nos techniciens peuvent installer vos accessoires à votre domicile ou sur votre lieu de travail.",
      badgeText: "Sur devis"
    },
    {
      title: "Extension de garantie",
      description: "Prolongez la garantie de vos accessoires jusqu'à 5 ans pour une tranquillité totale.",
      badgeText: "À partir de 199 CHF"
    }
  ];

  return (
    <div className="bg-muted p-8 rounded-xl mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Services associés</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            title={service.title}
            description={service.description}
            badgeText={service.badgeText}
          />
        ))}
      </div>
    </div>
  );
};

export default AssociatedServices;
