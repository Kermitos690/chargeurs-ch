
import { supabase } from '@/integrations/supabase/client';
import { type UserMetadata } from '@supabase/supabase-js';
// Remplacer l'importation de User par User de firebase/auth
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
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as AdminRole | null;
  } catch (error) {
    console.error("Erreur lors de la vérification du rôle:", error);
    return null;
  }
}

export async function getAllAdmins() {
  try {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*, profiles(*)');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
    return [];
  }
}

export async function setUserAsAdmin(userId: string, role: 'admin' | 'superadmin' = 'admin') {
  try {
    // Vérifier si l'utilisateur existe déjà comme admin
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      // Mettre à jour le rôle si l'admin existe déjà
      const { error: updateError } = await supabase
        .from('admin_roles')
        .update({ role })
        .eq('id', data.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Créer un nouveau rôle admin
      const { error: insertError } = await supabase
        .from('admin_roles')
        .insert({ user_id: userId, role });

      if (insertError) {
        throw insertError;
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la définition du rôle d'administrateur:", error);
    return { success: false, error: error.message };
  }
}

// Autres fonctions liées à l'administration...
