
// Type declarations for Supabase schema
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

// Alias types for better readability
export type AuthUser = User;
export type AuthSession = Session;

// Types for the tables in Supabase
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

// Type auxiliary for the user Supabase
export interface UserInfo {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  subscriptionType?: string;
}

// Re-export Database for use
export { Database }
