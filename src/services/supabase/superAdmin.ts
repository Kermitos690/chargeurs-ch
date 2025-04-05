
import { supabase } from '@/integrations/supabase/client';

/**
 * Vérifie si l'utilisateur actuel a le rôle de superadmin
 */
export const isUserSuperAdmin = async () => {
  try {
    const sessionResponse = await supabase.auth.getSession();
    if (sessionResponse.error) throw sessionResponse.error;
    
    const session = sessionResponse.data.session;
    if (!session?.user) return false;
    
    const { data: isSuperAdmin, error: roleError } = await supabase.rpc('is_superadmin', {
      _user_id: session.user.id
    });
    
    if (roleError) throw roleError;
    
    return isSuperAdmin;
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de superadmin:', error);
    return false;
  }
};

/**
 * Ajoute un rôle d'administrateur à un utilisateur
 */
export const addAdminRole = async (userId: string, role: 'admin' | 'superadmin' = 'admin') => {
  try {
    // Vérifier si l'utilisateur est déjà admin
    const existingRoleResponse = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', role);
      
    if (existingRoleResponse.error) throw existingRoleResponse.error;
    
    const existingRole = existingRoleResponse.data;
    
    // Si l'utilisateur n'a pas encore le rôle, l'ajouter
    if (!existingRole || existingRole.length === 0) {
      const { data, error } = await supabase
        .from('admin_roles')
        .insert([
          { user_id: userId, role }
        ]);
        
      if (error) throw error;
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de l\'ajout du rôle admin:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Retire un rôle d'administrateur à un utilisateur
 */
export const removeAdminRole = async (userId: string, role: 'admin' | 'superadmin' = 'admin') => {
  try {
    const deleteResponse = await supabase
      .from('admin_roles')
      .delete()
      .match({ user_id: userId, role });
      
    if (deleteResponse.error) throw deleteResponse.error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors du retrait du rôle admin:', error);
    return { success: false, error: error.message };
  }
};
