
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingCart, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getCartItems, calculateCartTotal } from '@/services/supabase/cart';
import CartDrawerItem from './CartDrawerItem';

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

  const fetchCart = async () => {
    setLoading(true);
    try {
      if (user) {
        const items = await getCartItems(user.id);
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };

  // Calcul du total du panier
  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shipping;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Mon Panier
          </SheetTitle>
        </SheetHeader>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">
              Parcourez notre catalogue et ajoutez des produits à votre panier.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartDrawerItem 
                  key={item.id} 
                  item={item} 
                  onUpdate={fetchCart}
                  onRemove={onCartUpdate}
                />
              ))}
            </div>
          </div>
        )}
        
        <SheetFooter>
          {cartItems.length > 0 && (
            <div className="w-full">
              <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{shipping > 0 ? `${shipping.toFixed(2)} CHF` : 'Gratuit'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} CHF</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Passer à la caisse
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
