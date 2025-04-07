
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description: string;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ description }) => {
  return (
    <Tabs defaultValue="description">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Spécifications</TabsTrigger>
        <TabsTrigger value="reviews">Avis clients</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="p-4 border rounded-md mt-2">
        <div className="prose max-w-none">
          <p>{description || "Aucune description détaillée disponible."}</p>
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
        <div className="prose max-w-none">
          <p>Informations techniques du produit non disponibles.</p>
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
        <div className="prose max-w-none">
          <p>Aucun avis disponible pour ce produit.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
