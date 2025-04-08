
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts, getCategories } from '@/services/products';

// Nouveaux composants
import ProductsHeader from '@/components/shop/products/ProductsHeader';
import FilterSidebar from '@/components/shop/products/FilterSidebar';
import ProductsGrid from '@/components/shop/products/ProductsGrid';
import ViewModeToggle from '@/components/shop/products/ViewModeToggle';
import ProductsPagination from '@/components/shop/products/ProductsPagination';
import MobileFilterToggle from '@/components/shop/products/MobileFilterToggle';
import { useProductFilters } from '@/hooks/useProductFilters';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [totalCount, setTotalCount] = useState(0);
  
  const { filters, handleFilterChange, resetFilters } = useProductFilters();
  
  // Titre de la page basé sur la catégorie sélectionnée
  const getPageTitle = () => {
    if (!filters.category) return "Tous nos produits";
    
    const selectedCategory = categories.find(cat => cat.slug === filters.category);
    return selectedCategory ? selectedCategory.name : "Produits";
  };
  
  useEffect(() => {
    // Charger les catégories
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

  useEffect(() => {
    // Charger les produits
    const loadProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts(filters);
        setProducts(result.products);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsHeader 
            filters={filters}
            onFilterChange={handleFilterChange}
            totalCount={totalCount}
            pageTitle={getPageTitle()}
          />
            
          <div className="flex justify-between mb-4">
            <MobileFilterToggle onClick={() => setIsFilterMenuOpen(true)} />
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
            
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filtres latéraux */}
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
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
