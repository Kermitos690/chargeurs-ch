
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

// Définir les types PostgrestError, User et Session à partir de ce qui est disponible
export type PostgrestError = ReturnType<typeof createClient>['from']['select']['catch']['parameters'][0]['error']
export type User = ReturnType<typeof createClient>['auth']['getUser']['then']['parameters'][0]['data']['user']
export type Session = ReturnType<typeof createClient>['auth']['getSession']['then']['parameters'][0]['data']['session']

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
