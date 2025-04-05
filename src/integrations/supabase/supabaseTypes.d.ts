
// Type declarations for Supabase schema
declare module '@supabase/supabase-js' {
  interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            name: string | null;
            email: string | null;
            phone: string | null;
            subscription_type: string | null;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            id: string;
            name?: string | null;
            email?: string | null;
            phone?: string | null;
            subscription_type?: string | null;
            created_at?: string;
            updated_at?: string;
          };
          Update: {
            id?: string;
            name?: string | null;
            email?: string | null;
            phone?: string | null;
            subscription_type?: string | null;
            created_at?: string;
            updated_at?: string;
          };
        };
        admin_roles: {
          Row: {
            id: string;
            user_id: string;
            role: 'admin' | 'superadmin';
            updated_at: string;
          };
          Insert: {
            id?: string;
            user_id: string;
            role: 'admin' | 'superadmin';
            updated_at?: string;
          };
          Update: {
            id?: string;
            user_id?: string;
            role?: 'admin' | 'superadmin';
            updated_at?: string;
          };
        };
        system_config: {
          Row: {
            id: string;
            initialized: boolean;
            initial_superadmin_email: string | null;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            id: string;
            initialized?: boolean;
            initial_superadmin_email?: string | null;
            created_at?: string;
            updated_at?: string;
          };
          Update: {
            id?: string;
            initialized?: boolean;
            initial_superadmin_email?: string | null;
            created_at?: string;
            updated_at?: string;
          };
        };
      };
    };
  }
}
