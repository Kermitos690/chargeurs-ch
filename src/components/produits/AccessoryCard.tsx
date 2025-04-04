
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Accessory } from '@/data/accessories';

interface AccessoryCardProps {
  accessory: Accessory;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory }) => {
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
        <Button className="w-full flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccessoryCard;
