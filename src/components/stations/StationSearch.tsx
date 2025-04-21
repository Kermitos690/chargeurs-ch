
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { StationSearchProps } from '@/types';
import { Station } from '@/types/api';

const StationSearch: React.FC<StationSearchProps> = ({ 
  stationsList, 
  onSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Rechercher la station correspondante
    const foundStation = stationsList.find(station => 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Si une station est trouvée, la sélectionner
    if (foundStation) {
      onSelect(foundStation.id);
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher une station..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
};

export default StationSearch;
