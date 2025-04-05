import { supabase } from '@/integrations/supabase/client';
import { accessories } from '@/data/accessories';

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
    // Vérifier si la catégorie demandée est "accessoires"
    if (filters.category === 'accessoires') {
      // Convertir les accessoires au format produit
      const accessoryProducts = accessories.map(acc => ({
        id: acc.id,
        name: acc.name,
        slug: `accessoire-${acc.id}`,
        price: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
        sale_price: null,
        image_url: acc.image,
        short_description: acc.description,
        description: acc.description,
        status: 'published',
        featured: true,
        stock_quantity: 100,
        created_at: new Date().toISOString(),
        product_categories: { name: 'Accessoires', slug: 'accessoires' }
      }));

      // Appliquer les filtres manuellement
      let filteredProducts = [...accessoryProducts];
      
      // Filtre par recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }

      // Filtre par prix
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      // Tri
      switch (filters.sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        // Par défaut, ne pas modifier l'ordre
      }

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedProducts = filteredProducts.slice(start, end);

      return {
        products: paginatedProducts,
        totalCount: filteredProducts.length,
        currentPage: page,
        totalPages: Math.ceil(filteredProducts.length / limit),
        limit
      };
    }

    // Sinon continuer avec la requête Supabase pour les autres produits
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
    if (category && category !== 'accessoires') {
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

// Récupérer un produit par son slug
export const getProductBySlug = async (slug: string) => {
  try {
    // Vérifier si c'est un accessoire
    if (slug.startsWith('accessoire-')) {
      const accId = slug.replace('accessoire-', '');
      const accessory = accessories.find(acc => acc.id === accId);
      
      if (accessory) {
        return {
          id: accessory.id,
          name: accessory.name,
          slug: slug,
          price: parseFloat(accessory.price.replace(/[^0-9.]/g, '')),
          sale_price: null,
          image_url: accessory.image,
          description: accessory.description,
          short_description: accessory.description,
          stock_quantity: 100,
          category_id: 'accessoires',
          product_categories: { id: 'accessoires', name: 'Accessoires', slug: 'accessoires' },
          product_variants: [],
          stripeProductId: accessory.stripeProductId
        };
      }
    }

    // Sinon, utiliser Supabase pour les autres produits
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

// Ajouter une fonction pour récupérer les catégories avec les accessoires
export const getCategoriesWithAccessories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('name');

    if (error) throw error;

    // Ajouter la catégorie accessoires
    return [
      ...data,
      { id: 'accessoires', name: 'Accessoires', slug: 'accessoires' }
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};
