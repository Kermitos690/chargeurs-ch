
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader2, Grid2X2, List, Search } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import AccessoryCard from '@/components/produits/accessoires/AccessoryCard';
import { accessories } from '@/data/accessories';

// Définir les catégories d'accessoires
const accessoryCategories = [
  { id: 'charging', name: 'Recharge', slug: 'charging' },
  { id: 'adapters', name: 'Adaptateurs', slug: 'adapters' },
  { id: 'storage', name: 'Rangement', slug: 'storage' },
  { id: 'protection', name: 'Protection', slug: 'protection' },
  { id: 'cards', name: 'Cartes et Badges', slug: 'cards' },
];

// Classer les accessoires par catégorie
const categorizeAccessories = () => {
  return {
    'charging': accessories.filter(acc => 
      acc.name.toLowerCase().includes('câble') || 
      acc.name.toLowerCase().includes('recharge') || 
      acc.name.toLowerCase().includes('borne')
    ),
    'adapters': accessories.filter(acc => 
      acc.name.toLowerCase().includes('adaptateur')
    ),
    'storage': accessories.filter(acc => 
      acc.name.toLowerCase().includes('support') || 
      acc.name.toLowerCase().includes('rangement')
    ),
    'protection': accessories.filter(acc => 
      acc.name.toLowerCase().includes('protection') || 
      acc.name.toLowerCase().includes('intempéries')
    ),
    'cards': accessories.filter(acc => 
      acc.name.toLowerCase().includes('carte') || 
      acc.name.toLowerCase().includes('rfid')
    ),
  };
};

const AllProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Accessoires classés par catégories
  const categorizedAccessories = categorizeAccessories();
  
  // Filtrer les accessoires selon le terme de recherche
  const filteredAccessories = accessories.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    acc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fonction pour obtenir les accessoires à afficher selon l'onglet sélectionné
  const getAccessoriesToDisplay = () => {
    if (currentTab === 'all') {
      return filteredAccessories;
    }
    return categorizedAccessories[currentTab] ? 
      categorizedAccessories[currentTab].filter(acc => 
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        acc.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) : [];
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
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select
                  defaultValue="newest"
                  onValueChange={(value) => {/* Ajout futur du tri */}}
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
            </div>
            
            {/* Onglets des catégories */}
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-8">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="all">Tous</TabsTrigger>
                {accessoryCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                  }>
                    {filteredAccessories.map((accessory) => (
                      <AccessoryCard 
                        key={accessory.id} 
                        item={accessory}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Contenu pour chaque catégorie */}
              {accessoryCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                      <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                      }>
                        {getAccessoriesToDisplay().map((accessory) => (
                          <AccessoryCard 
                            key={accessory.id} 
                            item={accessory}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;
