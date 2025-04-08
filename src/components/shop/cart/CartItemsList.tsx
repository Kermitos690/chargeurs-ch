
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '@/components/shop/CartItem';
import { motion } from 'framer-motion';

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
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
          <span>Vos articles ({items.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <motion.div 
          className="divide-y divide-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="p-4"
            >
              <CartItem item={item} onUpdate={onUpdate} />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/50 border-t">
        <Button 
          variant="outline" 
          onClick={onContinueShopping}
          className="flex items-center gap-2 hover:bg-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Continuer les achats
        </Button>
        <Button 
          variant="outline" 
          onClick={onClearCart}
          className="flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Vider le panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItemsList;
