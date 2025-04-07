
import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  quantity: number;
  stockQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ 
  quantity, 
  stockQuantity, 
  onIncrease, 
  onDecrease 
}) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Quantité</h3>
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-12 text-center">{quantity}</div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onIncrease}
          disabled={quantity >= stockQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
