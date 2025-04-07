
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getProductBySlug, getSimilarProducts } from '@/services/products';
import { addToCart } from '@/services/cart';
import { toast } from 'sonner';

// Import our new components
import ProductImageGallery from '@/components/shop/product-detail/ProductImageGallery';
import ProductInfo from '@/components/shop/product-detail/ProductInfo';
import ProductVariantSelector from '@/components/shop/product-detail/ProductVariantSelector';
import ProductQuantitySelector from '@/components/shop/product-detail/ProductQuantitySelector';
import ProductAdditionalInfo from '@/components/shop/product-detail/ProductAdditionalInfo';
import ProductTabs from '@/components/shop/product-detail/ProductTabs';
import SimilarProducts from '@/components/shop/product-detail/SimilarProducts';
import AddToCartButton from '@/components/shop/product-detail/AddToCartButton';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        
        // Si le produit a des variantes, sélectionner la première par défaut
        if (data.product_variants && data.product_variants.length > 0) {
          setSelectedVariant(data.product_variants[0]);
        }
        
        // Charger les produits similaires
        if (data.category_id) {
          const similar = await getSimilarProducts(data.id, data.category_id);
          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
        toast.error('Impossible de charger les détails du produit');
        navigate('/produits');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
    window.scrollTo(0, 0); // Faire défiler en haut de la page
  }, [slug, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      const variantId = selectedVariant?.id;
      const price = selectedVariant?.price || product.sale_price || product.price;
      
      const success = await addToCart(product.id, quantity, price, variantId);
      if (success) {
        toast.success('Produit ajouté au panier');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleVariantChange = (variantId: string) => {
    const variant = product.product_variants.find((v: any) => v.id === variantId);
    setSelectedVariant(variant);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <p className="mb-4">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/produits')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux produits
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = selectedVariant?.price || product.sale_price || product.price;
  const originalPrice = product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const stockQuantity = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
  const inStock = stockQuantity > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="py-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
          
          {/* Détails du produit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image du produit */}
            <ProductImageGallery 
              imageUrl={selectedVariant?.image_url || product.image_url} 
              alt={product.name} 
            />
            
            {/* Informations produit */}
            <div>
              <ProductInfo 
                name={product.name}
                description={product.description}
                price={price}
                originalPrice={originalPrice}
                hasDiscount={hasDiscount}
                inStock={inStock}
              />
              
              <ProductVariantSelector 
                variants={product.product_variants || []}
                selectedVariantId={selectedVariant?.id || ''}
                onVariantChange={handleVariantChange}
              />
              
              <ProductQuantitySelector 
                quantity={quantity}
                stockQuantity={stockQuantity}
                onIncrease={() => setQuantity(quantity + 1)}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              />
              
              {/* Boutons d'action */}
              <div className="mt-8 flex gap-4">
                <AddToCartButton 
                  onAddToCart={handleAddToCart}
                  disabled={!inStock}
                  loading={addingToCart}
                />
              </div>
              
              <ProductAdditionalInfo />
            </div>
          </div>
          
          {/* Onglets d'informations supplémentaires */}
          <div className="mb-12">
            <ProductTabs description={product.description} />
          </div>
          
          {/* Produits similaires */}
          <SimilarProducts products={similarProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
