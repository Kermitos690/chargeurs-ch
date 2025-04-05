
// Client Supabase simulé pour le développement
export const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        range: (from: number, to: number) => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: (limit: number) => Promise.resolve({ data: [], error: null }),
        order: (column: string, { ascending }: { ascending: boolean }) => 
          Promise.resolve({ data: [], error: null, count: 0 }),
        or: (query: string) => Promise.resolve({ data: [], error: null, count: 0 }),
        gte: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        lte: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        neq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
      }),
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
      order: (column: string, { ascending }: { ascending: boolean }) => 
        Promise.resolve({ data: [], error: null }),
      limit: (limit: number) => Promise.resolve({ data: [], error: null }),
      range: (from: number, to: number) => Promise.resolve({ data: [], error: null })
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: (callback: Function) => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ data: null, error: null })
  },
  rpc: (name: string, params: any) => Promise.resolve({ data: false, error: null })
};
