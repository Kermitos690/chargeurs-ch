
import { supabase } from '@/integrations/supabase/client';

/**
 * Vérifie si l'utilisateur actuel a le rôle de superadmin
 */
export const isUserSuperAdmin = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    if (!data.session?.user) return false;
    
    const { data: isSuperAdmin, error: roleError } = await supabase.rpc('is_superadmin', data.session.user.id);
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
    const { data: existingRole, error: checkError } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', role);
      
    if (checkError) throw checkError;
    
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
    const { data, error } = await supabase
      .from('admin_roles')
      .delete()
      .match({ user_id: userId, role });
      
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors du retrait du rôle admin:', error);
    return { success: false, error: error.message };
  }
};
