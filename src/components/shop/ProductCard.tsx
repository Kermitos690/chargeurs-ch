
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from 'lucide-react';
import { addToCart } from '@/services/cart/add';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    image_url?: string;
    short_description?: string;
  };
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    id,
    name,
    slug,
    price,
    sale_price,
    image_url,
    short_description
  } = product;

  const displayPrice = sale_price || price;
  const hasDiscount = sale_price !== null && sale_price !== undefined;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      await addToCart(id, 1);
      toast.success('Produit ajouté au panier');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`h-full overflow-hidden transition-all hover:shadow-md ${className || ''}`}>
      <Link to={`/produits/${slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-slate-50 relative">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
              Image non disponible
            </div>
          )}
          
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((price - sale_price) / price) * 100)}%
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-2">{name}</h3>
          {short_description && (
            <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{short_description}</p>
          )}
          <div className="mt-2 flex items-center">
            <span className="font-bold text-lg">{displayPrice.toFixed(2)} CHF</span>
            {hasDiscount && (
              <span className="text-muted-foreground text-sm line-through ml-2">
                {price.toFixed(2)} CHF
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
