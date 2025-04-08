
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCategories, getProducts } from '@/services/products';
import { useProductFilters } from '@/hooks/useProductFilters';

// Composants de filtrage et d'affichage
import ProductsHeader from '@/components/shop/products/ProductsHeader';
import FilterSidebar from '@/components/shop/products/FilterSidebar';
import ProductsGrid from '@/components/shop/products/ProductsGrid';
import ProductsPagination from '@/components/shop/products/ProductsPagination';
import MobileFilterToggle from '@/components/shop/products/MobileFilterToggle';
import ViewModeToggle from '@/components/shop/products/ViewModeToggle';

const Accessoires: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [totalCount, setTotalCount] = useState(0);
  
  // Utiliser notre hook de filtrage
  const { filters, handleFilterChange, resetFilters } = useProductFilters();
  
  // Charger les catégories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };
    
    loadCategories();
  }, []);

  // Charger les produits avec filtres
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Configurer les filtres spécifiques aux accessoires
        const accessoireFilters = {
          ...filters,
          category: 'accessories' // Fixer la catégorie sur 'accessories'
        };
        
        const result = await getProducts(accessoireFilters);
        setProducts(result.products);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount || 0);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [filters]);

  const handlePageChange = (page: number) => {
    handleFilterChange({ page });
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsHeader 
          filters={filters}
          onFilterChange={handleFilterChange}
          totalCount={totalCount}
          pageTitle="Accessoires pour Powerbanks"
        />
        
        <div className="flex justify-between mb-4">
          <MobileFilterToggle onClick={() => setIsFilterMenuOpen(true)} />
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres latéraux - Notez que nous fixons la catégorie sur 'accessories' */}
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            isOpen={isFilterMenuOpen}
            onClose={() => setIsFilterMenuOpen(false)}
          />
          
          {/* Liste des produits */}
          <div className="flex-grow">
            <ProductsGrid 
              products={products}
              loading={loading}
              viewMode={viewMode}
              onResetFilters={resetFilters}
            />
            
            {/* Pagination */}
            <ProductsPagination 
              currentPage={filters.page || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accessoires;
