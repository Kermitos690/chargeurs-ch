
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProductCard from '@/components/shop/ProductCard';
import { ProductFilters } from '@/services/products';

interface ProductsGridProps {
  products: any[];
  loading: boolean;
  viewMode: 'grid' | 'list';
  onResetFilters: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  loading, 
  viewMode,
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-muted rounded-lg">
        <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche.</p>
        <Button 
          variant="link" 
          onClick={onResetFilters}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }
  
  return (
    <div className={
      viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        : "space-y-4"
    }>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          className={viewMode === 'list' ? "!block" : ""}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
