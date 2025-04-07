
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
    const { data, error } = await supabase
      .from(collection)
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
    const { data, error } = await supabase
      .from(collection)
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
    const { error } = await supabase
      .from(collection)
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
    const { error } = await supabase
      .from(collection)
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
