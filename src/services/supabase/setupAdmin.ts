
import { createAdminAccount } from './auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Type pour le résultat de setupInitialAdmin
type SetupResult = 
  | { success: true; message: string; warning?: string }
  | { success: false; error: string };

export const setupInitialAdmin = async (): Promise<SetupResult> => {
  try {
    // Vérifier si l'administrateur existe déjà
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('role', 'superadmin')
      .maybeSingle();

    if (error) {
      console.error("Erreur lors de la vérification de l'administrateur:", error);
      return { success: false, error: error.message };
    }

    if (data) {
      return { success: false, error: "Un compte administrateur existe déjà" };
    }

    // Créer le compte admin avec le rôle superadmin
    const result = await createAdminAccount(
      'chargeurs@proton.me', 
      'mdr 11111111', 
      'superadmin'
    );

    if (!result.success) {
      // Extraire le message d'erreur du résultat
      return { success: false, error: result.error };
    }

    // Mettre à jour la configuration système pour indiquer que le superadmin a été créé
    const { error: configError } = await supabase
      .from('system_config')
      .upsert({
        id: 'system',
        initialized: true,
        initial_superadmin_email: 'chargeurs@proton.me'
      });

    if (configError) {
      console.error("Erreur lors de la mise à jour de la configuration:", configError);
      return { 
        success: true, 
        message: "Compte administrateur créé avec succès",
        warning: "Erreur de configuration système" 
      };
    }

    return { success: true, message: "Compte administrateur superadmin créé avec succès" };
  } catch (error: any) {
    console.error("Erreur critique lors de la création du compte admin:", error);
    return { success: false, error: error.message || "Erreur inconnue" };
  }
};

// Fonction pour créer un compte admin immédiatement
export const createAdminImmediately = async () => {
  try {
    const result = await setupInitialAdmin();
    
    if (result.success) {
      toast.success(result.message);
      return { success: true };
    } else {
      toast.error(result.error);
      return { success: false, error: result.error };
    }
  } catch (error: any) {
    toast.error(error.message || "Erreur inattendue");
    return { success: false, error: error.message };
  }
};
