
import React from 'react';
import { Button } from '@/components/ui/button';

const ContactFAQ = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Vous avez des questions fréquemment posées ? Consultez notre page FAQ pour trouver rapidement des réponses.
      </p>
      <Button size="lg" className="rounded-full">
        Voir les FAQ
      </Button>
    </div>
  );
};

export default ContactFAQ;
