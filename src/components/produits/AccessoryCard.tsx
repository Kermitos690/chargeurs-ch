
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Accessory } from '@/data/accessories';
import { addToCart } from '@/services/cart';

interface AccessoryCardProps {
  accessory: Accessory;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const success = await addToCart(
        accessory.id, 
        1, 
        parseFloat(accessory.price.replace(/[^0-9.]/g, '')), 
        undefined,
        accessory.stripeProductId
      );
      
      if (success) {
        toast.success(`${accessory.name} ajouté au panier`);
      } else {
        toast.error("Erreur lors de l'ajout au panier");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast.error("Erreur lors de l'ajout au panier");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={accessory.image} 
          alt={accessory.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{accessory.name}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {accessory.price}
          </Badge>
        </div>
        <CardDescription>{accessory.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-semibold mb-2">Caractéristiques :</h3>
        <ul className="space-y-1">
          {accessory.specs.map((spec, index) => (
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
