
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data?.session) {
      return null;
    }
    
    return data.session.user || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur courant:", error);
    return null;
  }
};

export const hasAdminRights = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    // Vérifier le rôle dans la table admin_roles
    const adminRolesResponse = await supabase
      .from('admin_roles')
      .select('*');
      
    // Simuler le comportement de eq() puisque c'est un mock
    const adminRoles = adminRolesResponse.data || [];
    const hasAdminRole = adminRoles.some(role => 
      role.user_id === userId && 
      (role.role === 'admin' || role.role === 'superadmin')
    );
    
    if (hasAdminRole) return true;
    
    // Si aucun rôle d'admin, vérifier la fonction RPC
    const { data: hasRole } = await supabase.rpc('has_role', { 
      _user_id: userId,
      _role: 'admin'
    });
    
    return Boolean(hasRole);
  } catch (error) {
    console.error("Erreur lors de la vérification des droits d'administrateur:", error);
    return false;
  }
};

export const hasSuperAdminRights = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    // Vérifier le rôle dans la table admin_roles
    const superAdminRolesResponse = await supabase
      .from('admin_roles')
      .select('*');
      
    // Simuler le comportement de eq() puisque c'est un mock
    const superAdminRoles = superAdminRolesResponse.data || [];
    const hasSuperAdminRole = superAdminRoles.some(role => 
      role.user_id === userId && role.role === 'superadmin'
    );
    
    return hasSuperAdminRole;
  } catch (error) {
    console.error("Erreur lors de la vérification des droits de super admin:", error);
    return false;
  }
};
