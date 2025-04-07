import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { updateCartItemQuantity, removeCartItem } from '@/services/cart';

interface CartDrawerItemProps {
  item: any;
  onUpdate: () => void;
  onRemove?: () => void;
}

const CartDrawerItem: React.FC<CartDrawerItemProps> = ({ item, onUpdate, onRemove }) => {
  const handleIncrease = async () => {
    await updateCartItemQuantity(item.id, item.quantity + 1);
    onUpdate();
  };

  const handleDecrease = async () => {
    await updateCartItemQuantity(item.id, item.quantity - 1);
    onUpdate();
  };

  const handleRemove = async () => {
    await removeCartItem(item.id);
    onUpdate();
    if (onRemove) onRemove();
  };

  return (
    <div key={item.id} className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 overflow-hidden rounded-md">
          <img
            src={item.variant?.imageUrl || item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{item.product.name}</h3>
          {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
          <p className="text-sm text-muted-foreground">{item.priceAtAdd.toFixed(2)} CHF</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handleDecrease} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button variant="outline" size="icon" onClick={handleIncrease}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartDrawerItem;
