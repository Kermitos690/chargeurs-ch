
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { updateCartItemQuantity, removeCartItem } from '@/services/cart';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      name: string;
      imageUrl?: string;
      price: number;
      regularPrice?: number;
    };
    variant?: {
      name: string;
      imageUrl?: string;
      price: number;
    } | null;
  };
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setLoading(true);
    try {
      await updateCartItemQuantity(item.id, newQuantity);
      onUpdate();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeCartItem(item.id);
      onUpdate();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const price = item.variant?.price || item.product.price;
  const totalPrice = price * item.quantity;
  const imageUrl = item.variant?.imageUrl || item.product.imageUrl;
  
  return (
    <div className="flex items-start gap-3 pb-3 border-b">
      <div className="w-16 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-muted-foreground text-xs">
            Image non disponible
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
        {item.variant && (
          <p className="text-sm text-muted-foreground">{item.variant.name}</p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || loading}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-2 w-5 text-center">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={loading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium text-right">
              {totalPrice.toFixed(2)} CHF
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 ml-2 text-muted-foreground hover:text-destructive" 
              onClick={handleRemove}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
