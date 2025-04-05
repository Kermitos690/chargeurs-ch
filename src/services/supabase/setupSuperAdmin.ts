
import { supabase } from '@/integrations/supabase/client';
import type { SystemConfigRow, ProfileRow, AdminRoleRow } from '@/types/supabaseTypes.d';

// Cette fonction permet d'initialiser un superadmin dans le système
export const setupInitialSuperAdmin = async (email: string): Promise<boolean> => {
  try {
    // Vérifier si un superadmin a déjà été configuré
    const configResponse = await supabase
      .from('system_config')
      .select('*');
    
    // Simuler le comportement de eq() et single() pour le mock
    const configData = configResponse.data?.find(config => config.id === 'admin_setup') || null;
    const configError = configResponse.error;
    
    if (configError && configError.code !== 'PGRST116') {
      console.error("Erreur lors de la vérification de la configuration:", configError);
      return false;
    }
    
    const config = configData as SystemConfigRow | null;
    if (config?.initialized) {
      console.log("Configuration des superadmins déjà initialisée");
      return false;
    }
    
    // Récupérer l'utilisateur par email
    const userResponse = await supabase
      .from('profiles')
      .select('id');
    
    // Simuler le comportement de eq() pour le mock
    const userData = userResponse.data?.find(profile => profile.email === email) || null;
    const userError = userResponse.error;
    
    if (userError) {
      console.error("Erreur lors de la recherche de l'utilisateur:", userError);
      return false;
    }
    
    const profile = userData as ProfileRow | null;
    if (!profile?.id) {
      console.error("Aucun utilisateur trouvé avec cet email:", email);
      return false;
    }
    
    // Définir le rôle de superadmin
    const { error: roleError } = await supabase
      .from('admin_roles')
      .upsert({ 
        user_id: profile.id, 
        role: 'superadmin',
        updated_at: new Date().toISOString()
      } as Partial<AdminRoleRow>);
    
    if (roleError) {
      console.error("Erreur lors de la définition du rôle superadmin:", roleError);
      return false;
    }
    
    // Marquer la configuration comme initialisée
    const { error: updateError } = await supabase
      .from('system_config')
      .upsert({
        id: 'admin_setup',
        initialized: true,
        initial_superadmin_email: email,
        updated_at: new Date().toISOString()
      } as Partial<SystemConfigRow>);
    
    if (updateError) {
      console.error("Erreur lors de la mise à jour de la configuration:", updateError);
      return false;
    }
    
    console.log("Configuration du superadmin initialisée pour:", email);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du superadmin:", error);
    return false;
  }
};

export const isSuperAdminSetupComplete = async (): Promise<boolean> => {
  try {
    const configResponse = await supabase
      .from('system_config')
      .select('initialized');
    
    // Simuler le comportement de eq() et single() pour le mock
    const configData = configResponse.data?.find(config => config.id === 'admin_setup') || null;
    const configError = configResponse.error;
    
    if (configError) {
      console.error("Erreur lors de la vérification de la configuration superadmin:", configError);
      return false;
    }
    
    const config = configData as SystemConfigRow | null;
    return config?.initialized || false;
  } catch (error) {
    console.error("Erreur lors de la vérification de la configuration superadmin:", error);
    return false;
  }
};
