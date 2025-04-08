
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Loader2 } from 'lucide-react';
import EmptyCart from '@/components/shop/cart/EmptyCart';
import CartItemsList from '@/components/shop/cart/CartItemsList';
import CartSummary from '@/components/shop/cart/CartSummary';
import { getCartItems, clearCart, calculateCartTotal } from '@/services/cart';
import { createCheckoutSession } from '@/services/checkout';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setCheckoutLoading(true);
    try {
      await createCheckoutSession();
      // La redirection sera gérée par createCheckoutSession
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
      setCheckoutLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/produits');
  };

  const handleClearCart = async () => {
    if (user) {
      await clearCart(user.id);
      fetchCart();
    }
  };

  // Calcul du total du panier
  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Mon Panier</h1>
        <p className="text-muted-foreground mb-8">
          {cartItems.length > 0 
            ? `${cartItems.length} article${cartItems.length > 1 ? 's' : ''} dans votre panier` 
            : 'Votre panier est vide'}
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCart onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList 
                items={cartItems}
                onContinueShopping={handleContinueShopping}
                onClearCart={handleClearCart}
                onUpdate={fetchCart}
              />
            </div>
            <div>
              <CartSummary 
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
                checkoutLoading={checkoutLoading}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
