import { supabase } from '@/integrations/supabase/client';

/**
 * Configure les détails d'un utilisateur dans Supabase
 */
export const setupUserDetails = async (
  userId: string,
  firstName: string,
  lastName: string
) => {
  try {
    console.log(`Setting up user details for user ${userId}`);
    
    const { error } = await supabase
      .from('user_details')
      .upsert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error setting up user details:', error);
      return { success: false, error };
    }
    
    // Check if user has admin role - replace exec_sql with has_role RPC
    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', { 
      _user_id: userId,
      _role: 'admin'
    });
    
    if (roleError) {
      console.error('Error checking user role:', roleError);
    }
    
    return { 
      success: true, 
      isAdmin: isAdmin || false 
    };
  } catch (error) {
    console.error('Exception while setting up user details:', error);
    return { success: false, error };
  }
};

export default setupUserDetails;
