
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Station } from '@/types/api';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactMap from '@/components/contact/ContactMap';
import ContactFAQ from '@/components/contact/ContactFAQ';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Adresse",
      details: ["1000 Lausanne", "Suisse"]
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Téléphone",
      details: ["+41 78 633 67 77"]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: ["info@chargeurs.ch", "support@chargeurs.ch"]
    }
  ];

  // Définir l'emplacement de l'entreprise pour la carte
  const officeLocation: Station[] = [{
    id: "office",
    name: "chargeurs.ch - Siège",
    location: "1000 Lausanne",
    latitude: 46.519, // Coordonnées pour Lausanne
    longitude: 6.633,
    status: "online", 
    availablePowerBanks: 0,
    totalSlots: 0
  }];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des questions ou des suggestions ? Nous sommes là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ContactForm />
            <ContactInfo contactInfo={contactInfo} />
          </div>

          <ContactMap location={officeLocation} />
          <ContactFAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
