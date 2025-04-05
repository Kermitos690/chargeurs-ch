
// Types simplifiés pour l'intégration Supabase
import type { Database } from '@/integrations/supabase/types'

// Types simplifiés pour l'utilisateur Supabase
export type AuthUser = {
  id: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
  aud?: string;
  email?: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
};

// Types pour les tables dans Supabase
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

// Ré-exporter Database pour l'utiliser
export { Database }
