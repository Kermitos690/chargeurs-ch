
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from './types';

/**
 * Récupérer toutes les catégories de produits
 */
export const getCategories = async (): Promise<ProductCategory[]> => {
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
