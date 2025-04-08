
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UserSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserSearchFilter = ({ searchTerm, onSearchChange }: UserSearchFilterProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher un utilisateur..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default UserSearchFilter;
