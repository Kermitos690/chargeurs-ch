
// Types pour les services de panier
export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    image_url?: string;
  };
  variant?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    attributes?: Record<string, any>;
  } | null;
  priceAtAdd: number;
}

export interface Cart {
  id: string;
  user_id?: string;
  session_id?: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}
