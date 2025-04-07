
// Types pour les fonctionnalités du panier
export interface CartItem {
  id: string;
  quantity: number;
  priceAtAdd: number;
  product: {
    id: string;
    name: string;
    slug: string;
    imageUrl?: string;
    price: number;
    regularPrice: number;
  };
  variant?: {
    id: string;
    name: string;
    imageUrl?: string;
    price: number;
    attributes: any; // Changé de Record<string, any> à any pour accepter Json
  } | null;
}
