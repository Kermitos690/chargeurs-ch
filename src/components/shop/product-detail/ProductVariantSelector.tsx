
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Variant {
  id: string;
  name: string;
}

interface ProductVariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({ 
  variants, 
  selectedVariantId, 
  onVariantChange 
}) => {
  if (!variants || variants.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Options</h3>
      <RadioGroup 
        value={selectedVariantId} 
        onValueChange={onVariantChange}
        className="flex flex-wrap gap-2"
      >
        {variants.map((variant) => (
          <div key={variant.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={variant.id} 
              id={variant.id} 
              className="peer sr-only"
            />
            <Label
              htmlFor={variant.id}
              className="flex items-center justify-center px-3 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
            >
              {variant.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ProductVariantSelector;
