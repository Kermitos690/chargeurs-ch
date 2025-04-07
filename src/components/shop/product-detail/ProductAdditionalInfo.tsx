
import React from 'react';
import { Truck, Shield, RefreshCw } from 'lucide-react';

const ProductAdditionalInfo: React.FC = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-start gap-3">
        <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <h4 className="font-medium">Livraison gratuite</h4>
          <p className="text-sm text-muted-foreground">Pour les commandes de plus de 50 CHF</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <h4 className="font-medium">Garantie de 2 ans</h4>
          <p className="text-sm text-muted-foreground">Tous nos produits sont garantis</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RefreshCw className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <h4 className="font-medium">Retours sous 14 jours</h4>
          <p className="text-sm text-muted-foreground">Retournez facilement votre commande</p>
        </div>
      </div>
    </div>
  );
};

export default ProductAdditionalInfo;
