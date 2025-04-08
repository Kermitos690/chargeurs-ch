
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

const HelpSection: React.FC = () => {
  return (
    <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Besoin d'aide pour choisir ?</h2>
      <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
        Notre équipe d'experts est à votre disposition pour vous guider dans le choix 
        des accessoires les plus adaptés à votre véhicule et à vos besoins.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button size="lg" className="w-full sm:w-auto">
            <Phone className="mr-2 h-4 w-4" />
            Nous contacter
          </Button>
        </Link>
        <Link to="/faq">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Consulter la FAQ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HelpSection;
