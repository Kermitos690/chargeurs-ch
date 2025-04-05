
import { supabase } from '@/integrations/supabase/client';
// Remove the import from supabase-js and use firebase's User type
import { User } from 'firebase/auth';

interface AdminRole {
  id: string;
  user_id: string;
  role: 'admin' | 'superadmin';
}

export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || !data.session) {
      return { success: false, error: 'Erreur de connexion' };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return { success: false, error: error.message || 'Erreur de connexion' };
  }
}

export async function checkAdminRole(userId: string) {
  try {
    const response = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (response.error) {
      throw response.error;
    }

    return response.data as AdminRole | null;
  } catch (error) {
    console.error("Erreur lors de la vérification du rôle:", error);
    return null;
  }
}

export async function getAllAdmins() {
  try {
    const response = await supabase
      .from('admin_roles')
      .select('*, profiles(*)');

    if (response.error) {
      throw response.error;
    }

    return response.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
    return [];
  }
}

export async function setUserAsAdmin(userId: string, role: 'admin' | 'superadmin' = 'admin') {
  try {
    // Vérifier si l'utilisateur existe déjà comme admin
    const response = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (response.error) {
      throw response.error;
    }

    if (response.data) {
      // Mettre à jour le rôle si l'admin existe déjà
      const updateResponse = await supabase
        .from('admin_roles')
        .update({ role })
        .eq('id', response.data.id);

      if (updateResponse.error) {
        throw updateResponse.error;
      }
    } else {
      // Créer un nouveau rôle admin
      const insertResponse = await supabase
        .from('admin_roles')
        .insert({ user_id: userId, role });

      if (insertResponse.error) {
        throw insertResponse.error;
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la définition du rôle d'administrateur:", error);
    return { success: false, error: error.message };
  }
}

// Autres fonctions liées à l'administration...
