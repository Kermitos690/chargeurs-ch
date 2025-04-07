
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
  onAddToCart: () => void;
  disabled: boolean;
  loading: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  onAddToCart, 
  disabled, 
  loading 
}) => {
  return (
    <Button 
      size="lg" 
      className="flex-1"
      disabled={disabled || loading}
      onClick={onAddToCart}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      Ajouter au panier
    </Button>
  );
};

export default AddToCartButton;
