
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RentalInfoProps {
  maxAmount: number;
  onContinue: () => void;
  onCancel: () => void;
}

const RentalInfo: React.FC<RentalInfoProps> = ({ maxAmount, onContinue, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Pré-autorisation</span>
          <span>{maxAmount.toFixed(2)} CHF</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Tarif horaire</span>
          <span>2.00 CHF / heure</span>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          <strong>Comment ça fonctionne :</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Une pré-autorisation de {maxAmount.toFixed(2)} CHF est effectuée sur votre carte.</li>
          <li>Ce montant n'est pas débité immédiatement.</li>
          <li>À la restitution, seule la durée réelle d'utilisation vous sera facturée.</li>
          <li>La différence vous sera remboursée automatiquement.</li>
        </ol>
      </div>

      <div className="bg-blue-50 p-4 rounded-md flex items-center gap-3 text-sm">
        <ShieldCheck className="text-blue-600 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium text-blue-800">Garantie limitée</p>
          <p className="text-blue-700">Les powerbanks sont garanties 12 mois dans le cadre d'une utilisation normale.</p>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={onContinue}>
          Continuer
        </Button>
      </DialogFooter>
    </div>
  );
};

export default RentalInfo;
