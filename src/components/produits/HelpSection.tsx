
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HelpSection: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Besoin d'aide pour choisir ?</h2>
      <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
        Notre équipe d'experts est à votre disposition pour vous guider dans le choix 
        des accessoires les plus adaptés à votre véhicule et à vos besoins.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button size="lg">Nous contacter</Button>
        </Link>
        <Link to="/faq">
          <Button variant="outline" size="lg">Consulter la FAQ</Button>
        </Link>
      </div>
    </div>
  );
};

export default HelpSection;
