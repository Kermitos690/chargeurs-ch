
// Mock de Supabase pour le développement sans connexion à Supabase
// Remplacer ce fichier par la véritable intégration Supabase lors de la connexion

// Types simplifiés pour le mock
type MockUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
};

export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
      order: (column: string, { ascending }: { ascending: boolean }) => 
        Promise.resolve({ data: [], error: null }),
      limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      range: (from: number, to: number) => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
      maybeSingle: () => Promise.resolve({ data: null, error: null }),
    }),
    insert: (values: any) => Promise.resolve({ data: values, error: null }),
    update: (values: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: values, error: null }),
      match: (params: Record<string, any>) => Promise.resolve({ data: values, error: null }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
      match: (params: Record<string, any>) => Promise.resolve({ data: null, error: null }),
    }),
    upsert: (values: any) => Promise.resolve({ data: values, error: null }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: Function) => ({
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
    updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
  },
  rpc: (func: string, params?: any) => Promise.resolve({ data: false, error: null }),
  functions: {
    invoke: (name: string, options?: any) => Promise.resolve({ data: null, error: null })
  },
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `/mockUrl/${path}` } }),
      list: (prefix?: string) => Promise.resolve({ data: [], error: null }),
      remove: (paths: string[]) => Promise.resolve({ data: null, error: null }),
    })
  }
};

// Helper function pour vérifier si un utilisateur est super admin
export const isSuperAdmin = async (user: MockUser | null) => {
  if (!user) return false;
  
  // Dans un mock, on peut simplement retourner false
  // Dans la véritable intégration, on ferait un appel à une fonction RPC
  return false;
};
