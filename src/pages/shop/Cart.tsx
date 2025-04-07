
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Loader2, ArrowRight, AlertTriangle, Truck } from 'lucide-react';
import CartItem from '@/components/shop/CartItem';
import { getCartItems, calculateCartTotal, clearCart } from '@/services/cart';
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
      const items = await getCartItems(user?.uid);
      setCartItems(items);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?.uid]);

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

  const handleContinueShopping = () => {
    navigate('/produits');
  };

  const handleClearCart = async () => {
    await clearCart(user?.uid);
    fetchCart();
  };

  // Calcul du total du panier
  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
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
              <div className="text-center py-16 bg-muted rounded-lg">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
                <p className="text-muted-foreground mb-6">
                  Parcourez notre catalogue et ajoutez des produits à votre panier.
                </p>
                <Button onClick={handleContinueShopping}>
                  Parcourir les produits
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Détail du panier */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <CartItem key={item.id} item={item} onUpdate={fetchCart} />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        onClick={handleContinueShopping}
                      >
                        Continuer les achats
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleClearCart}
                      >
                        Vider le panier
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Résumé de la commande */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé de la commande</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span>{subtotal.toFixed(2)} CHF</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Livraison</span>
                          <span>{shipping > 0 ? `${shipping.toFixed(2)} CHF` : 'Gratuit'}</span>
                        </div>
                        {shipping > 0 && (
                          <div className="text-xs text-muted-foreground">
                            <Truck className="inline-block h-3 w-3 mr-1" />
                            Livraison gratuite à partir de 50 CHF
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>{total.toFixed(2)} CHF</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <Button 
                        className="w-full mb-3" 
                        size="lg"
                        disabled={checkoutLoading}
                        onClick={handleCheckout}
                      >
                        {checkoutLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            Procéder au paiement
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <div className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>
                          Les articles sont réservés pendant 60 minutes. Ils ne sont pas garantis tant que la commande n'est pas finalisée.
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
