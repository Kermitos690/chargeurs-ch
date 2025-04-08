
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
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, AlertTriangle, Truck, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Card className="border-border/50 shadow-sm sticky top-24">
      <CardHeader className="pb-2 border-b">
        <CardTitle>Résumé de la commande</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium">{subtotal.toFixed(2)} CHF</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">Livraison</span>
              {shipping === 0 && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Gratuite</Badge>
              )}
            </div>
            <span className="font-medium">{shipping > 0 ? `${shipping.toFixed(2)} CHF` : 'Gratuit'}</span>
          </div>
          {shipping > 0 && (
            <div className="text-xs text-muted-foreground flex items-center bg-muted p-2 rounded">
              <Truck className="inline-block h-3 w-3 mr-2 flex-shrink-0" />
              <span>Livraison gratuite à partir de 50 CHF d'achat</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="font-bold text-lg">{total.toFixed(2)} CHF</span>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col p-4 bg-muted/30 border-t gap-4">
        <Button 
          className="w-full"
          size="lg"
          disabled={checkoutLoading}
          onClick={onCheckout}
        >
          {checkoutLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              Procéder au paiement
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground flex items-start gap-2">
            <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-500" />
            <span>
              Les articles sont réservés pendant 60 minutes. Ils ne sont pas garantis tant que la commande n'est pas finalisée.
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-500" />
            <span>
              Paiement sécurisé via Stripe. Nous acceptons les cartes de crédit, TWINT et autres méthodes de paiement.
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
