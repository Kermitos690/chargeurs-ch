
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFilters } from '@/services/products';

interface ProductsHeaderProps {
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
  totalCount?: number;
  pageTitle: string;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  filters, 
  onFilterChange, 
  totalCount,
  pageTitle 
}) => {
  return (
    <div className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        {totalCount !== undefined && (
          <p className="text-muted-foreground">
            {totalCount} produit{totalCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value || undefined })}
          />
        </div>
        
        <Select
          value={filters.sort}
          onValueChange={(value) => onFilterChange({ sort: value as any })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Plus récents</SelectItem>
            <SelectItem value="price-asc">Prix: croissant</SelectItem>
            <SelectItem value="price-desc">Prix: décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductsHeader;
