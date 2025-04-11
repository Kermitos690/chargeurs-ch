
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import AccessoryCard from '@/components/produits/accessoires/AccessoryCard';
import { Accessory } from '@/data/accessories';

interface CategoryTabsProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  loading: boolean;
  accessoriesToDisplay: (category: string) => Accessory[];
  viewMode: 'grid' | 'list';
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  currentTab,
  setCurrentTab,
  loading,
  accessoriesToDisplay,
  viewMode,
}) => {
  return (
    <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-8">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="all">Tous</TabsTrigger>
        {categories.map(category => (
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
            {accessoriesToDisplay('all').map((accessory) => (
              <AccessoryCard 
                key={accessory.id} 
                item={accessory}
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      {/* Contenu pour chaque catégorie */}
      {categories.map(category => (
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
                {accessoriesToDisplay(category.id).map((accessory) => (
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
  );
};

export default CategoryTabs;
