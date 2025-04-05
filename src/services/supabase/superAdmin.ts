
import { AuthUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AdminRoleRow } from '@/types/supabaseTypes';

// Vérifie si un utilisateur a le rôle de superadmin
export const isSuperAdmin = async (user: AuthUser | null): Promise<boolean> => {
  if (!user) return false;
  
  try {
    // Utiliser la fonction SQL is_superadmin pour vérifier si l'utilisateur est superadmin
    const { data, error } = await supabase.rpc('is_superadmin', { _user_id: user.id });
    
    if (error) {
      console.error("Erreur lors de la vérification des droits superadmin:", error);
      return false;
    }
    
    return data || false;
  } catch (error) {
    console.error("Erreur lors de la vérification des droits superadmin:", error);
    return false;
  }
};

// Définit le rôle superadmin pour un utilisateur
export const setSuperAdminRole = async (userId: string, isSuperAdmin: boolean): Promise<boolean> => {
  try {
    if (isSuperAdmin) {
      // Ajouter le rôle superadmin
      const { error } = await supabase
        .from('admin_roles')
        .upsert({ 
          user_id: userId, 
          role: 'superadmin',
          updated_at: new Date().toISOString()
        } as Partial<AdminRoleRow>);
      
      if (error) throw error;
    } else {
      // Supprimer le rôle superadmin
      const { error } = await supabase
        .from('admin_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'superadmin');
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la définition du rôle superadmin:", error);
    return false;
  }
};
