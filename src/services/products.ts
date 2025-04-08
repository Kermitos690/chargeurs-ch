
import { supabase } from '@/integrations/supabase/client';

// Types pour les paramètres de filtrage
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

// Récupérer tous les produits avec filtrage et pagination
export const getProducts = async (filters: ProductFilters = {}) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'newest',
      featured,
      page = 1,
      limit = 12
    } = filters;

    let query = supabase
      .from('products')
      .select('*, product_categories(name, slug)', { count: 'exact' })
      .eq('status', 'published');

    // Filtre par catégorie
    if (category) {
      query = query.eq('product_categories.slug', category);
    }

    // Filtre par recherche
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filtre par prix
    if (minPrice !== undefined) {
      query = query.gte('price', minPrice);
    }
    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice);
    }

    // Filtre par produits en vedette
    if (featured !== undefined) {
      query = query.eq('featured', featured);
    }

    // Tri
    switch (sort) {
      case 'price-asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      // Pour un tri "populaire", vous auriez besoin d'une colonne supplémentaire comme "sales_count"
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      products: data,
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
      limit
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Récupérer les produits par catégorie
export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name, slug)')
      .eq('product_categories.slug', categorySlug)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération des produits de la catégorie ${categorySlug}:`, error);
    return [];
  }
};

// Récupérer un produit par son slug
export const getProductBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(id, name, slug),
        product_variants(id, name, price, stock_quantity, attributes, image_url)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

// Récupérer un produit par son ID
export const getProductById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(id, name, slug),
        product_variants(id, name, price, stock_quantity, attributes, image_url)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

// Récupérer toutes les catégories de produits
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

// Récupérer les produits similaires
export const getSimilarProducts = async (productId: string, categoryId: string, limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .eq('category_id', categoryId)
      .neq('id', productId)
      .limit(limit);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits similaires:', error);
    throw error;
  }
};

// Récupérer les produits en vedette
export const getFeaturedProducts = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .limit(limit);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en vedette:', error);
    throw error;
  }
};
