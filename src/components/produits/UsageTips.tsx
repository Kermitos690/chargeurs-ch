
import React from 'react';

interface TipItemProps {
  text: string;
}

const TipItem: React.FC<TipItemProps> = ({ text }) => {
  return (
    <li className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
      </div>
      <p>{text}</p>
    </li>
  );
};

const UsageTips: React.FC = () => {
  const tips = [
    "Inspectez régulièrement vos câbles pour détecter d'éventuels dommages",
    "Évitez de tordre ou d'écraser vos câbles lors du rangement",
    "Protégez les connecteurs de l'humidité et de la poussière",
    "N'utilisez pas d'adaptateurs non homologués",
    "Suivez les recommandations du fabricant de votre véhicule"
  ];

  return (
    <div className="bg-card border rounded-xl p-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Conseils d'utilisation</h2>
          <p className="mb-6">
            Pour assurer la longévité de vos accessoires de recharge et garantir une utilisation 
            en toute sécurité, voici quelques conseils pratiques :
          </p>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <TipItem key={index} text={tip} />
            ))}
          </ul>
        </div>
        <div className="h-80 bg-accent rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600393215717-cd9c56b3ca87?w=800&auto=format&fit=crop&q=60" 
            alt="Utilisation d'un câble de recharge" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UsageTips;
