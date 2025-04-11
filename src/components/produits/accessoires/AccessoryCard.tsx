
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { addToCart } from '@/services/cart';
import { toast } from 'sonner';

interface AccessorySpec {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  specs: string[];
}

interface AccessoryCardProps {
  item: AccessorySpec;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // Convertir le prix de format "XX CHF" à un nombre
      const priceStr = item.price.replace(' CHF', '').trim();
      const price = parseFloat(priceStr);
      
      if (isNaN(price)) {
        throw new Error('Prix invalide');
      }
      
      await addToCart(item.id.toString(), 1, price);
      toast.success(`${item.name} ajouté au panier`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Impossible d\'ajouter ce produit au panier');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={item.id} className="flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{item.name}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {item.price}
          </Badge>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-semibold mb-2">Caractéristiques :</h3>
        <ul className="space-y-1">
          {item.specs.map((spec, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center gap-2"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccessoryCard;
