
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, Loader2 } from 'lucide-react';
import { updateCartItemQuantity, removeFromCart } from '@/services/supabase/cart';

interface CartItemProps {
  item: any;
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate }) => {
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    setUpdating(true);
    try {
      await updateCartItemQuantity(item.id, newQuantity);
      onUpdate();
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    setRemoving(true);
    try {
      await removeFromCart(item.id);
      onUpdate();
    } finally {
      setRemoving(false);
    }
  };

  const price = item.variant?.price || item.product.price;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/produits/${item.product.slug}`}>
            <img
              src={item.variant?.imageUrl || item.product.imageUrl || '/placeholder.png'}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
          <div>
            <Link to={`/produits/${item.product.slug}`} className="font-medium hover:underline">
              {item.product.name}
            </Link>
            {item.variant && (
              <div className="text-sm text-muted-foreground">
                {item.variant.name}
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              {price.toFixed(2)} CHF
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1 || updating}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={updating}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveItem}
            disabled={removing}
          >
            {removing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default CartItem;
