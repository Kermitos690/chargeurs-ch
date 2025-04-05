
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

    // Simulation de la requête Supabase avec notre mock
    // Ici, nous retournons simplement un tableau vide car le mock ne peut pas vraiment filtrer
    return {
      products: [],
      totalCount: 0,
      currentPage: page,
      totalPages: 0,
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

    // Pour les autres produits, retourner null car notre mock ne contient pas de données réelles
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

// Récupérer un produit par son ID
export const getProductById = async (id: string) => {
  try {
    // Vérifier si c'est un accessoire
    const accessory = accessories.find(acc => acc.id === id);
    if (accessory) {
      return {
        id: accessory.id,
        name: accessory.name,
        slug: `accessoire-${id}`,
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

    // Pour les autres produits, retourner null car notre mock ne contient pas de données réelles
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

// Récupérer toutes les catégories de produits
export const getCategories = async () => {
  try {
    // Dans notre mock, nous retournons simplement un tableau vide
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

// Récupérer les produits similaires
export const getSimilarProducts = async (productId: string, categoryId: string, limit = 4) => {
  try {
    // Dans notre mock, filtrer les accessoires si c'est la catégorie demandée
    if (categoryId === 'accessoires') {
      return accessories
        .filter(acc => acc.id !== productId)
        .slice(0, limit)
        .map(acc => ({
          id: acc.id,
          name: acc.name,
          slug: `accessoire-${acc.id}`,
          price: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
          sale_price: null,
          image_url: acc.image,
          description: acc.description,
          status: 'published',
          featured: true
        }));
    }
    
    // Sinon retourner un tableau vide
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des produits similaires:', error);
    throw error;
  }
};

// Récupérer les produits en vedette
export const getFeaturedProducts = async (limit = 4) => {
  try {
    // Dans notre mock, retourner quelques accessoires comme produits en vedette
    return accessories.slice(0, limit).map(acc => ({
      id: acc.id,
      name: acc.name,
      slug: `accessoire-${acc.id}`,
      price: parseFloat(acc.price.replace(/[^0-9.]/g, '')),
      sale_price: null,
      image_url: acc.image,
      description: acc.description,
      status: 'published',
      featured: true
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en vedette:', error);
    throw error;
  }
};

// Ajouter une fonction pour récupérer les catégories avec les accessoires
export const getCategoriesWithAccessories = async () => {
  try {
    // Ici, nous retournons au moins la catégorie 'accessoires'
    return [
      { id: 'accessoires', name: 'Accessoires', slug: 'accessoires' }
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};
