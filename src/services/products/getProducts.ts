
import { supabase } from '@/integrations/supabase/client';
import { ProductFilters, ProductsResponse, Product } from './types';

/**
 * Récupérer tous les produits avec filtrage et pagination
 */
export const getProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
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

/**
 * Récupérer les produits par catégorie
 */
export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
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
