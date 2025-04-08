
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductFilters } from '@/services/products';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
  categories: any[];
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  categories, 
  isOpen, 
  onClose 
}) => {
  return (
    <div 
      className={`w-full md:w-64 space-y-6 ${
        isOpen || 'hidden md:block'
      }`}
    >
      <div>
        <h3 className="font-medium mb-3">Catégories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all" 
              checked={!filters.category}
              onCheckedChange={() => onFilterChange({ category: undefined })}
            />
            <label htmlFor="all" className="text-sm cursor-pointer">Toutes les catégories</label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={category.slug} 
                checked={filters.category === category.slug}
                onCheckedChange={() => onFilterChange({ category: category.slug })}
              />
              <label htmlFor={category.slug} className="text-sm cursor-pointer">{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-3">En vedette</h3>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="featured" 
            checked={filters.featured === true}
            onCheckedChange={(checked) => onFilterChange({ 
              featured: checked === true ? true : undefined 
            })}
          />
          <label htmlFor="featured" className="text-sm cursor-pointer">Produits en vedette</label>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full md:hidden mt-4"
        onClick={onClose}
      >
        Fermer les filtres
      </Button>
    </div>
  );
};

export default FilterSidebar;
