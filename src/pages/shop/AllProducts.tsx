
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSearch from '@/components/shop/ProductSearch';
import ProductViewOptions from '@/components/shop/ProductViewOptions';
import CategoryTabs from '@/components/shop/CategoryTabs';
import { useAccessoryCategories } from '@/hooks/useAccessoryCategories';

const AllProducts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Utiliser le hook personnalisé pour les catégories et le filtrage
  const { categories, getAccessoriesToDisplay } = useAccessoryCategories(searchTerm);
  
  const handleSortChange = (value: string) => {
    // Logique de tri à implémenter ultérieurement
    console.log("Sort changed to:", value);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-6">Tous les Produits</h1>
            
            {/* Barre de recherche et options d'affichage */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <ProductSearch 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              
              <ProductViewOptions 
                viewMode={viewMode}
                setViewMode={setViewMode}
                onSortChange={handleSortChange}
              />
            </div>
            
            {/* Onglets des catégories */}
            <CategoryTabs 
              categories={categories}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              loading={loading}
              accessoriesToDisplay={getAccessoriesToDisplay}
              viewMode={viewMode}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;
