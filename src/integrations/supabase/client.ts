
// Client Supabase simulé pour le développement
export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null }),
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
        or: (query: string) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
        gte: (column: string, value: any) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
        lte: (column: string, value: any) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
        neq: (column: string, value: any) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
      }),
      or: (query: string) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      }),
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        }),
      }),
      gte: (column: string, value: any) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      }),
      lte: (column: string, value: any) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      }),
      neq: (column: string, value: any) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      }),
      limit: (limit: number) => ({
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        }),
      }),
      range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
      single: () => Promise.resolve({ data: null, error: null }),
      maybeSingle: () => Promise.resolve({ data: null, error: null }),
    }),
    insert: (data: any) => ({
      select: () => Promise.resolve({ data: null, error: null }),
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
      match: (criteria: any) => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
      match: (criteria: any) => Promise.resolve({ data: null, error: null }),
    }),
    upsert: (data: any) => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: Function) => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
    signIn: (params: any) => Promise.resolve({ data: null, error: null }),
    signInWithPassword: (params: any) => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signUp: (params: any) => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: (email: string, options?: any) => Promise.resolve({ data: null, error: null }),
    updateUser: (params: any) => Promise.resolve({ data: { user: null }, error: null }),
  },
  rpc: (name: string, params: any) => Promise.resolve({ data: false, error: null }),
  functions: {
    invoke: (functionName: string, options?: { body?: any }) => 
      Promise.resolve({ data: null, error: null }),
  }
};

// Helper function to simulate the isSuperAdmin function
export const isSuperAdmin = async (user: any): Promise<boolean> => {
  return false;
};
