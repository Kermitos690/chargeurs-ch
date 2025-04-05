
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from 'lucide-react';
import { updateCartItemQuantity, removeCartItem } from '@/services/cart';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      slug: string;
      imageUrl?: string;
      price: number;
    };
    variant?: {
      id: string;
      name: string;
      imageUrl?: string;
      price?: number;
      attributes?: Record<string, any>;
    } | null;
  };
  onUpdate?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate }) => {
  const { id, quantity, product, variant } = item;
  const price = variant?.price || product.price;
  const name = product.name + (variant ? ` - ${variant.name}` : '');
  const imageUrl = variant?.imageUrl || product.imageUrl;
  const subtotal = price * quantity;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity === 0) {
      await removeCartItem(id);
    } else {
      await updateCartItemQuantity(id, newQuantity);
    }
    if (onUpdate) onUpdate();
  };

  const handleRemove = async () => {
    await removeCartItem(id);
    if (onUpdate) onUpdate();
  };

  return (
    <div className="flex py-4 border-b">
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden rounded">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Pas d'image
          </div>
        )}
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <Link to={`/produits/${product.slug}`} className="font-medium hover:text-primary">
            {name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-gray-500 hover:text-red-500"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-muted-foreground text-sm mt-1">
          {price.toFixed(2)} CHF
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="font-bold">
            {subtotal.toFixed(2)} CHF
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
