
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <motion.div 
      className="text-center py-16 px-4 bg-muted rounded-lg shadow-sm border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
      </motion.div>
      
      <h2 className="text-2xl font-semibold mb-3">Votre panier est vide</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Parcourez notre catalogue et ajoutez des produits à votre panier pour commencer votre expérience d'achat.
      </p>
      
      <Button 
        onClick={onContinueShopping} 
        size="lg" 
        className="px-8 hover:scale-105 transition-transform"
      >
        Découvrir nos produits
      </Button>
    </motion.div>
  );
};

export default EmptyCart;
