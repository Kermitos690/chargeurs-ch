import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Loader2 
} from 'lucide-react';
import { getCartItems, calculateCartTotal } from '@/services/cart';
import { createCheckoutSession } from '@/services/checkout';
import { getUserProfile } from '@/services/supabase/profile';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const items = await getCartItems();
        if (items.length === 0) {
          toast.error('Votre panier est vide');
          navigate('/panier');
          return;
        }
        setCartItems(items);
        
        // Si l'utilisateur est connecté, récupérer et pré-remplir ses informations
        if (user) {
          try {
            const userProfile = await getUserProfile(user.id);
            if (userProfile) {
              setShippingDetails({
                firstName: userProfile.firstName || '',
                lastName: userProfile.lastName || '',
                address: userProfile.address || '',
                city: userProfile.city || '',
                postalCode: userProfile.postalCode || '',
                phone: userProfile.phone || ''
              });
            }
          } catch (profileError) {
            console.error("Erreur lors de la récupération du profil:", profileError);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        toast.error('Impossible de charger le panier');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setProcessingPayment(true);
    try {
      // Créer la session Stripe et rediriger vers la page de paiement
      const result = await createCheckoutSession(
        `${window.location.origin}/checkout/success`,
        `${window.location.origin}/checkout/cancel`
      );
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la création de la session de paiement');
      }
      
      // La redirection sera gérée par le service createCheckoutSession
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      toast.error('Une erreur est survenue lors du traitement du paiement');
      setProcessingPayment(false);
    }
  };

  const validateForm = () => {
    // Vérification basique des champs obligatoires
    const { firstName, lastName, address, city, postalCode, phone } = shippingDetails;
    return firstName && lastName && address && city && postalCode && phone;
  };

  // Calcul du total
  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement...</span>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Finaliser votre commande</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de livraison */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de livraison</CardTitle>
                    <CardDescription>
                      Veuillez saisir vos coordonnées pour la livraison
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={shippingDetails.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={shippingDetails.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={shippingDetails.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input 
                          id="postalCode" 
                          name="postalCode" 
                          value={shippingDetails.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Résumé de la commande pour mobile */}
                <div className="lg:hidden mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Récapitulatif de la commande</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.product.name}
                              {item.variant && ` - ${item.variant.name}`}
                              {item.quantity > 1 && ` (x${item.quantity})`}
                            </span>
                            <span className="font-medium">
                              {((item.variant?.price || item.product.price) * item.quantity).toFixed(2)} CHF
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
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
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={processingPayment}
                      >
                        {processingPayment ? (
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
                    </CardFooter>
                  </Card>
                </div>
              </form>
            </div>
            
            {/* Résumé de la commande desktop */}
            <div className="hidden lg:block">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Récapitulatif de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.product.name}
                          {item.variant && ` - ${item.variant.name}`}
                          {item.quantity > 1 && ` (x${item.quantity})`}
                        </span>
                        <span className="font-medium">
                          {((item.variant?.price || item.product.price) * item.quantity).toFixed(2)} CHF
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
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
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Paiement sécurisé par Stripe
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Visa, Mastercard, AMEX, TWINT acceptés
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Truck className="mr-2 h-4 w-4" />
                      Livraison gratuite dès 50 CHF
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    form="checkout-form"
                    type="submit" 
                    className="w-full" 
                    disabled={processingPayment}
                    onClick={handleSubmit}
                  >
                    {processingPayment ? (
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
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
