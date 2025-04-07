
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Loader2 
} from 'lucide-react';
import { CartItem } from '@/services/cart/types';

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  processingPayment: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isMobile?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cartItems, 
  subtotal, 
  shipping, 
  total, 
  processingPayment, 
  handleSubmit,
  isMobile = false
}) => {
  return (
    <Card className={isMobile ? "" : "sticky top-24"}>
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
        
        {!isMobile && (
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
        )}
      </CardContent>
      <CardFooter>
        <Button 
          form={isMobile ? undefined : "checkout-form"}
          type="submit" 
          className="w-full" 
          disabled={processingPayment}
          onClick={isMobile ? undefined : handleSubmit}
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
  );
};

export default OrderSummary;
