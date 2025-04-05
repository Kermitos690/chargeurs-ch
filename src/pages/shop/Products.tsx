import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Filter, Search, Grid2X2, List, Loader2 } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts, getCategoriesWithAccessories, ProductFilters } from '@/services/products';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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

  useEffect(() => {
    // Charger les catégories
    const loadCategories = async () => {
      try {
        const data = await getCategoriesWithAccessories();
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
        
        // Mettre à jour l'URL avec les filtres
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.search) params.set('q', filters.search);
        if (filters.sort) params.set('sort', filters.sort);
        if (filters.page && filters.page > 1) params.set('page', filters.page.toString());
        setSearchParams(params);
        
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    // Réinitialiser la page à 1 lors d'un changement de filtre
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-6">Produits</h1>
            
            {/* Barre de recherche et filtres */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange({ search: e.target.value || undefined })}
                />
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={filters.sort}
                  onValueChange={(value) => handleFilterChange({ sort: value as any })}
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
                
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                
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
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filtres latéraux (visible sur desktop ou lorsque toggle) */}
              <div 
                className={`w-full md:w-64 space-y-6 ${
                  isFilterMenuOpen || 'hidden md:block'
                }`}
              >
                <div>
                  <h3 className="font-medium mb-3">Catégories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="all" 
                        checked={!filters.category}
                        onCheckedChange={() => handleFilterChange({ category: undefined })}
                      />
                      <label htmlFor="all" className="text-sm cursor-pointer">Toutes les catégories</label>
                    </div>
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={category.slug} 
                          checked={filters.category === category.slug}
                          onCheckedChange={() => handleFilterChange({ category: category.slug })}
                        />
                        <label htmlFor={category.slug} className="text-sm cursor-pointer">{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Autres filtres comme prix, etc. */}
                <div>
                  <h3 className="font-medium mb-3">En vedette</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={filters.featured === true}
                      onCheckedChange={(checked) => handleFilterChange({ 
                        featured: checked === true ? true : undefined 
                      })}
                    />
                    <label htmlFor="featured" className="text-sm cursor-pointer">Produits en vedette</label>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full md:hidden mt-4"
                  onClick={() => setIsFilterMenuOpen(false)}
                >
                  Fermer les filtres
                </Button>
              </div>
              
              {/* Liste des produits */}
              <div className="flex-grow">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche.</p>
                    <Button 
                      variant="link" 
                      onClick={() => handleFilterChange({ 
                        category: undefined, 
                        search: undefined, 
                        minPrice: undefined, 
                        maxPrice: undefined, 
                        featured: undefined 
                      })}
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }>
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        className={viewMode === 'list' ? "!block" : ""}
                      />
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        // Afficher seulement les pages autour de la page actuelle
                        if (
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink 
                                isActive={currentPage === page}
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          (page === currentPage - 2 && currentPage > 3) || 
                          (page === currentPage + 2 && currentPage < totalPages - 2)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
