
import { supabase } from '@/integrations/supabase/client';
import { Product } from './types';

/**
 * Récupérer les produits similaires
 */
export const getSimilarProducts = async (productId: string, categoryId: string, limit = 4): Promise<Product[]> => {
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

/**
 * Récupérer les produits en vedette
 */
export const getFeaturedProducts = async (limit = 4): Promise<Product[]> => {
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
