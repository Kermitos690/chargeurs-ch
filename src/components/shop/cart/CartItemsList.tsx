
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import CartItem from '@/components/shop/CartItem';

interface CartItemsListProps {
  items: any[];
  onContinueShopping: () => void;
  onClearCart: () => void;
  onUpdate: () => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  onContinueShopping, 
  onClearCart,
  onUpdate
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onUpdate={onUpdate} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onContinueShopping}
        >
          Continuer les achats
        </Button>
        <Button 
          variant="outline" 
          onClick={onClearCart}
        >
          Vider le panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItemsList;
