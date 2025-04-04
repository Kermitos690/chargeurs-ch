
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface StationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const StationSearch: React.FC<StationSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch,
  isLoading = false
}) => {
  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un bar, un lieu..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Rechercher'}
        </Button>
      </div>
    </form>
  );
};

export default StationSearch;
