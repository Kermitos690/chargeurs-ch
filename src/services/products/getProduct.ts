
import { supabase } from '@/integrations/supabase/client';
import { Product } from './types';

/**
 * Récupérer un produit par son slug
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
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

/**
 * Récupérer un produit par son ID
 */
export const getProductById = async (id: string): Promise<Product> => {
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
