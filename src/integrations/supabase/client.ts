// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wokvkfwnqdpdgrquhnub.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva3ZrZnducWRwZGdycXVobnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MjkxNTEsImV4cCI6MjA1MjMwNTE1MX0.h_FW68sQZBQx97ogOX71Gli6CSiuOTiQrPTWT5DeEnY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);