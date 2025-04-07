
import React from 'react';
import ProductCard from '@/components/shop/ProductCard';

interface SimilarProductsProps {
  products: any[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
