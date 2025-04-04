import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Truck, 
  Shield, 
  RefreshCw, 
  Loader2,
  Plus,
  Minus
} from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { getProductBySlug, getSimilarProducts } from '@/services/products';
import { addToCart } from '@/services/cart';
import { toast } from 'sonner';

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
        
        if (data.product_variants && data.product_variants.length > 0) {
          setSelectedVariant(data.product_variants[0]);
        }
        
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
    window.scrollTo(0, 0);
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
          <div className="py-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img 
                  src={selectedVariant?.image_url || product.image_url} 
                  alt={product.name} 
                  className="w-full h-auto object-contain aspect-square"
                />
              ) : (
                <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-100 text-gray-400">
                  Image non disponible
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="mt-4 flex items-center">
                <span className="text-2xl font-bold">{price.toFixed(2)} CHF</span>
                {hasDiscount && (
                  <span className="ml-2 text-muted-foreground line-through">
                    {originalPrice.toFixed(2)} CHF
                  </span>
                )}
                {hasDiscount && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                    -{Math.round(((originalPrice - product.sale_price) / originalPrice) * 100)}%
                  </span>
                )}
              </div>
              
              <div className={`mt-2 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                {inStock ? 'En stock' : 'Rupture de stock'}
              </div>
              
              <div className="mt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              {product.product_variants && product.product_variants.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Options</h3>
                  <RadioGroup 
                    value={selectedVariant.id} 
                    onValueChange={(value) => {
                      const variant = product.product_variants.find((v: any) => v.id === value);
                      setSelectedVariant(variant);
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {product.product_variants.map((variant: any) => (
                      <div key={variant.id} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={variant.id} 
                          id={variant.id} 
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={variant.id}
                          className="flex items-center justify-center px-3 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
                        >
                          {variant.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Quantité</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center">{quantity}</div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= stockQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1"
                  disabled={!inStock || addingToCart}
                  onClick={handleAddToCart}
                >
                  {addingToCart ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="mr-2 h-4 w-4" />
                  )}
                  Ajouter au panier
                </Button>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Livraison gratuite</h4>
                    <p className="text-sm text-muted-foreground">Pour les commandes de plus de 50 CHF</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Garantie de 24 mois</h4>
                    <p className="text-sm text-muted-foreground">Sous réserve d'une utilisation adaptée</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Retours sous 14 jours</h4>
                    <p className="text-sm text-muted-foreground">Retournez facilement votre commande</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="reviews">Avis clients</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 border rounded-md mt-2">
                <div className="prose max-w-none">
                  <p>{product.description || "Aucune description détaillée disponible."}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
                <div className="prose max-w-none">
                  <p>Informations techniques du produit non disponibles.</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
                <div className="prose max-w-none">
                  <p>Aucun avis disponible pour ce produit.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
