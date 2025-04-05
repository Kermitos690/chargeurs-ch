
import { createClient } from "@supabase/supabase-js";

// Initialisation du client Supabase
export const supabase = createClient(
  "https://wokvkfwnqdpdgrquhnub.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indva3ZrZnducWRwZGdycXVobnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MjkxNTEsImV4cCI6MjA1MjMwNTE1MX0.h_FW68sQZBQx97ogOX71Gli6CSiuOTiQrPTWT5DeEnY"
);
