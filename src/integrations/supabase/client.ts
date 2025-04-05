
import { createClient } from '@supabase/supabase-js'

// Create a single Supabase client for interacting with the database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://wokvkfwnqdpdgrquhnub.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva3ZrZnducWRwZGdycXVobnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MjkxNTEsImV4cCI6MjA1MjMwNTE1MX0.h_FW68sQZBQx97ogOX71Gli6CSiuOTiQrPTWT5DeEnY'
)
