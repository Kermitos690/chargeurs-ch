
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Badge, Star } from 'lucide-react';
import { addToCart } from '@/services/cart';
import { formatPrice } from '@/services/firebase/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    image_url?: string;
    short_description?: string;
    featured?: boolean;
    average_rating?: number;
    stock_quantity?: number;
  };
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const {
    id,
    name,
    slug,
    price,
    sale_price,
    image_url,
    short_description,
    featured,
    average_rating,
    stock_quantity
  } = product;

  const displayPrice = sale_price || price;
  const hasDiscount = sale_price !== null && sale_price !== undefined;
  const isLowStock = stock_quantity !== undefined && stock_quantity > 0 && stock_quantity < 5;
  const isOutOfStock = stock_quantity !== undefined && stock_quantity <= 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;
    
    await addToCart(id, 1, displayPrice);
  };

  return (
    <Card className={`h-full overflow-hidden transition-all hover:shadow-md group ${className || ''}`}>
      <Link to={`/produits/${slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-slate-50 relative">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
              Image non disponible
            </div>
          )}
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {featured && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                En vedette
              </span>
            )}
            
            {isLowStock && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                Stock limité
              </span>
            )}
            
            {isOutOfStock && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Rupture de stock
              </span>
            )}
          </div>
          
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((price - sale_price) / price) * 100)}%
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors">{name}</h3>
          {short_description && (
            <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{short_description}</p>
          )}
          
          {average_rating && (
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(average_rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">({average_rating.toFixed(1)})</span>
            </div>
          )}
          
          <div className="mt-2 flex items-center">
            <span className="font-bold text-lg">{formatPrice(displayPrice)}</span>
            {hasDiscount && (
              <span className="text-muted-foreground text-sm line-through ml-2">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isOutOfStock ? "outline" : "default"}
                className="w-full"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isOutOfStock ? 'Indisponible' : 'Ajouter'}
              </Button>
            </TooltipTrigger>
            {isOutOfStock && (
              <TooltipContent>
                <p>Ce produit est actuellement en rupture de stock</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
