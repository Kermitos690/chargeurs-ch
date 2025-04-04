
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
      <ol className="space-y-4">
        <li className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</div>
          <div>
            <h3 className="font-medium mb-1">Trouvez une borne</h3>
            <p className="text-muted-foreground">Localisez la borne la plus proche de vous sur la carte ou via la liste.</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</div>
          <div>
            <h3 className="font-medium mb-1">Scannez le QR code</h3>
            <p className="text-muted-foreground">Utilisez notre application mobile pour scanner le QR code sur la borne.</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">3</div>
          <div>
            <h3 className="font-medium mb-1">Prenez votre powerbank</h3>
            <p className="text-muted-foreground">La borne déverrouille automatiquement un slot, prenez votre powerbank.</p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">4</div>
          <div>
            <h3 className="font-medium mb-1">Retournez-la dans n'importe quelle borne</h3>
            <p className="text-muted-foreground">Une fois terminé, vous pouvez retourner la powerbank dans n'importe quelle borne de notre réseau.</p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
