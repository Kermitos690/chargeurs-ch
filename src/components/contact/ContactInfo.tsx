
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactInfoProps {
  contactInfo: Array<{
    icon: React.ReactNode;
    title: string;
    details: string[];
  }>;
}

const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
      <div className="bg-accent p-8 rounded-xl h-full">
        <div className="space-y-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">{info.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <h3 className="font-semibold text-lg mb-4">Heures d'ouverture</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Lundi - Vendredi</span>
              <span>09:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Samedi</span>
              <span>10:00 - 16:00</span>
            </div>
            <div className="flex justify-between">
              <span>Dimanche</span>
              <span>Fermé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
