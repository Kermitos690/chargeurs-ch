
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/api';
import { toast } from 'sonner';

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    // Map database fields to User type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name || 'N/A',
      email: item.email || 'N/A',
      phone: item.phone || 'N/A',
      subscriptionType: item.subscription_type,
      createdAt: item.created_at
    }));
  } catch (error: any) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    toast.error(`Erreur: ${error.message || "Impossible de récupérer les utilisateurs"}`);
    return [];
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name || 'N/A',
      email: data.email || 'N/A',
      phone: data.phone || 'N/A',
      subscriptionType: data.subscription_type,
      createdAt: data.created_at
    };
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de l'utilisateur (${id}):`, error);
    toast.error(`Erreur: ${error.message || "Impossible de récupérer l'utilisateur"}`);
    return null;
  }
};

export const createUser = async (userData: Partial<User>): Promise<User | null> => {
  try {
    // Create auth user (this would typically happen through signup)
    // For admins creating users, you would need to use a server-side function
    // This is a simplified version for demo purposes
    
    const { data, error } = await supabase.from('profiles').insert({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      subscription_type: userData.subscriptionType
    }).select().single();
    
    if (error) {
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subscriptionType: data.subscription_type,
      createdAt: data.created_at
    };
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    toast.error(`Erreur: ${error.message || "Impossible de créer l'utilisateur"}`);
    return null;
  }
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        subscription_type: userData.subscriptionType,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subscriptionType: data.subscription_type,
      createdAt: data.created_at
    };
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur (${id}):`, error);
    toast.error(`Erreur: ${error.message || "Impossible de mettre à jour l'utilisateur"}`);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    console.error(`Erreur lors de la suppression de l'utilisateur (${id}):`, error);
    toast.error(`Erreur: ${error.message || "Impossible de supprimer l'utilisateur"}`);
    return false;
  }
};
