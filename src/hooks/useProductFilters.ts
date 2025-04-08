
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilters } from '@/services/products';

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('q') || undefined,
    sort: (searchParams.get('sort') as any) || 'newest',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 12,
    minPrice: undefined,
    maxPrice: undefined,
    featured: undefined
  });

  // Mettre à jour l'URL lorsque les filtres changent
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('q', filters.search);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page && filters.page > 1) params.set('page', filters.page.toString());
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    // Réinitialiser la page à 1 lors d'un changement de filtre (sauf si le changement est la page elle-même)
    if (!('page' in newFilters)) {
      setFilters(prev => ({
        ...prev,
        ...newFilters,
        page: 1
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        ...newFilters
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      category: undefined, 
      search: undefined,
      sort: 'newest',
      page: 1,
      limit: 12,
      minPrice: undefined, 
      maxPrice: undefined, 
      featured: undefined
    });
  };

  return {
    filters,
    handleFilterChange,
    resetFilters
  };
};
