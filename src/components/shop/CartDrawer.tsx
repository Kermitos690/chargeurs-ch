
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, AlertTriangle } from 'lucide-react';
import CartItem from './CartItem';
import { getCartItems, calculateCartTotal, clearCart } from '@/services/cart';
import { createCheckoutSession } from '@/services/checkout';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCartUpdate?: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onOpenChange, onCartUpdate }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const items = await getCartItems(user?.uid);
      setCartItems(items);
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCart();
    }
  }, [open, user?.uid]);

  const handleClearCart = async () => {
    await clearCart(user?.uid);
    setCartItems([]);
    if (onCartUpdate) onCartUpdate();
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      await createCheckoutSession();
      // La redirection sera gérée par createCheckoutSession
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleGoToCart = () => {
    onOpenChange(false);
    navigate('/panier');
  };

  // Calcul du total du panier
  const total = calculateCartTotal(cartItems);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Mon Panier
            {cartItems.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-auto py-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Votre panier est vide</p>
              <SheetClose asChild>
                <Button variant="link" className="mt-2" onClick={() => navigate('/produits')}>
                  Parcourir les produits
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-2">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={fetchCart} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">{total.toFixed(2)} CHF</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="default" 
                className="w-full" 
                disabled={checkoutLoading} 
                onClick={handleCheckout}
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  "Procéder au paiement"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoToCart}
              >
                Voir le panier
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground" 
                onClick={handleClearCart}
              >
                Vider le panier
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
