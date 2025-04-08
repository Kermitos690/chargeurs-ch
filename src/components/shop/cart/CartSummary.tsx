
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight, AlertTriangle, Truck } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  checkoutLoading: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  subtotal, 
  shipping, 
  total, 
  onCheckout, 
  checkoutLoading 
}) => {
  return (
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
          onClick={onCheckout}
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
  );
};

export default CartSummary;
