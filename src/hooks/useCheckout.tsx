
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import { getCartItems, calculateCartTotal } from '@/services/cart';
import { createCheckoutSession } from '@/services/checkout';
import { getUserProfile } from '@/services/supabase/profile';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export const useCheckout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
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

  const validateForm = () => {
    // Vérification basique des champs obligatoires
    const { firstName, lastName, address, city, postalCode, phone } = shippingDetails;
    return firstName && lastName && address && city && postalCode && phone;
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

  // Calcul du total
  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shipping;

  return {
    cartItems,
    loading,
    processingPayment,
    shippingDetails,
    subtotal,
    shipping,
    total,
    handleInputChange,
    handleSubmit
  };
};
