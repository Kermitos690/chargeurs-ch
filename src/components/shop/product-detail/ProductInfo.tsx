
import React from 'react';

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  hasDiscount: boolean;
  inStock: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  name, 
  description, 
  price, 
  originalPrice, 
  hasDiscount, 
  inStock 
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      
      <div className="mt-4 flex items-center">
        <span className="text-2xl font-bold">{price.toFixed(2)} CHF</span>
        {hasDiscount && (
          <span className="ml-2 text-muted-foreground line-through">
            {originalPrice.toFixed(2)} CHF
          </span>
        )}
        {hasDiscount && (
          <span className="ml-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </span>
        )}
      </div>
      
      <div className={`mt-2 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
        {inStock ? 'En stock' : 'Rupture de stock'}
      </div>
      
      <div className="mt-4">
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
