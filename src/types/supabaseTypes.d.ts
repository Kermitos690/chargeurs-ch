
import type { User, Session } from '@supabase/supabase-js';

// Types personnalisés pour l'utilisateur Supabase
export type AuthUser = User;
export type AuthSession = Session;

// Types pour les tables personnalisées Supabase
export interface ProfileRow {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subscription_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminRoleRow {
  id: string;
  user_id: string;
  role: 'admin' | 'superadmin';
  updated_at: string;
}

export interface SystemConfigRow {
  id: string;
  initialized: boolean;
  initial_superadmin_email: string | null;
  created_at: string;
  updated_at: string;
}

// Type auxiliaire pour l'utilisateur Supabase
export interface UserInfo {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  subscriptionType?: string;
}
