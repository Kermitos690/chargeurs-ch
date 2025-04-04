
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { getCartItems } from '@/services/cart';

const CartIcon: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const items = await getCartItems();
      setItemCount(items.length);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'articles:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    
    // Mettre à jour le nombre d'articles à intervalles réguliers
    const interval = setInterval(fetchCartCount, 30000); // toutes les 30 secondes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      
      <CartDrawer 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen} 
      />
    </>
  );
};

export default CartIcon;
