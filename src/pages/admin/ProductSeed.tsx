
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from '@/components/AdminLayout';
import { Loader2 } from 'lucide-react';
import { seedProducts } from '@/services/productSeed';

const ProductSeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSeedProducts = async () => {
    setIsLoading(true);
    try {
      const result = await seedProducts();
      if (result) {
        setIsDone(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ajouter des produits de démonstration</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Importer des produits prédéfinis</CardTitle>
            <CardDescription>
              Cette action va ajouter plusieurs produits de démonstration à votre boutique, 
              incluant des powerbanks, des bornes de recharge, des goodies et des cartes cadeaux.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Les produits seront ajoutés avec leurs catégories, images, descriptions et variantes.
              Cette opération peut prendre quelques instants.
            </p>
            
            {isDone && (
              <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
                <p className="text-green-800 font-medium">Les produits ont été ajoutés avec succès !</p>
                <p className="text-green-600 text-sm mt-1">
                  Vous pouvez maintenant les consulter dans la section Produits de l'administration.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSeedProducts} 
              disabled={isLoading || isDone}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Importation en cours...
                </>
              ) : isDone ? (
                "Produits importés"
              ) : (
                "Importer les produits"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProductSeed;
