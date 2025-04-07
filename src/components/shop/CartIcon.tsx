
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { getCartItems } from '@/services/cart';
import { useAuth } from '@/hooks/useAuth';

const CartIcon: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const { user } = useAuth();

  const fetchCartCount = async () => {
    try {
      const items = await getCartItems(user?.id);
      setItemCount(items.length);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'articles:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    
    // Mettre à jour le nombre d'articles à intervalles réguliers
    const interval = setInterval(fetchCartCount, 30000); // toutes les 30 secondes
    
    // Créer un événement personnalisé pour la mise à jour du panier
    const handleCartUpdate = () => {
      fetchCartCount();
    };
    
    // Ajouter un écouteur d'événements pour les mises à jour du panier
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, [user]);

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
