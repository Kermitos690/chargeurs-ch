
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid2X2, List } from 'lucide-react';

interface ProductViewOptionsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onSortChange: (value: string) => void;
}

const ProductViewOptions: React.FC<ProductViewOptionsProps> = ({ 
  viewMode, 
  setViewMode,
  onSortChange 
}) => {
  return (
    <div className="flex gap-2">
      <Select
        defaultValue="newest"
        onValueChange={onSortChange}
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
      
      <div className="hidden md:flex border rounded-md">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="icon"
          className="rounded-none rounded-l-md"
          onClick={() => setViewMode('grid')}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="icon"
          className="rounded-none rounded-r-md"
          onClick={() => setViewMode('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductViewOptions;
