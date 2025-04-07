
import { supabase } from '@/integrations/supabase/client';

export const logoutAdmin = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error during logout:", error);
    return { success: false, error: error.message };
  }
};

export const getCollection = async (collection: string) => {
  try {
    // Only allow accessing tables that exist in our schema
    if (!isValidTable(collection)) {
      throw new Error(`Collection ${collection} does not exist`);
    }
    
    const { data, error } = await supabase
      .from(collection as any)
      .select('*');
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error getting collection ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

export const getDocument = async (collection: string, id: string) => {
  try {
    // Only allow accessing tables that exist in our schema
    if (!isValidTable(collection)) {
      throw new Error(`Collection ${collection} does not exist`);
    }
    
    const { data, error } = await supabase
      .from(collection as any)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error getting document ${id} from ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

export const updateDocument = async (collection: string, id: string, data: any) => {
  try {
    // Only allow accessing tables that exist in our schema
    if (!isValidTable(collection)) {
      throw new Error(`Collection ${collection} does not exist`);
    }
    
    const { error } = await supabase
      .from(collection as any)
      .update(data)
      .eq('id', id);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error updating document ${id} in ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

export const deleteDocument = async (collection: string, id: string) => {
  try {
    // Only allow accessing tables that exist in our schema
    if (!isValidTable(collection)) {
      throw new Error(`Collection ${collection} does not exist`);
    }
    
    const { error } = await supabase
      .from(collection as any)
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting document ${id} from ${collection}:`, error);
    return { success: false, error: error.message };
  }
};

export const fromTimestamp = (timestamp: any) => {
  if (!timestamp) return null;
  
  if (timestamp?.seconds) {
    // Firebase Timestamp format
    return new Date(timestamp.seconds * 1000);
  }
  
  // Already a date string or object
  return timestamp;
};

// Helper function to check if a table name is valid
function isValidTable(tableName: string): boolean {
  const validTables = [
    'admin_roles',
    'cart_items',
    'carts',
    'products',
    'product_variants',
    'messages',
    'order_items',
    'orders',
    'product_categories',
    'profiles',
    'system_config',
    'user_details'
  ];
  
  return validTables.includes(tableName);
}
