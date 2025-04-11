
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex-grow relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Rechercher un produit..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;
