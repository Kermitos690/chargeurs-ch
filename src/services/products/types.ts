
// Types for the products service
export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular'; 
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number | null;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  image_url?: string;
  status: 'draft' | 'published';
  featured?: boolean;
  category_id?: string;
  created_at: string;
  updated_at: string;
  product_categories?: ProductCategory;
  product_variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  product_id: string;
  price: number;
  stock_quantity: number;
  attributes?: Record<string, any>;
  image_url?: string;
  sku?: string;
}
