
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center py-16 bg-muted rounded-lg">
      <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
      <p className="text-muted-foreground mb-6">
        Parcourez notre catalogue et ajoutez des produits à votre panier.
      </p>
      <Button onClick={onContinueShopping}>
        Parcourir les produits
      </Button>
    </div>
  );
};

export default EmptyCart;
