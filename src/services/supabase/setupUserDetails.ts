
import { supabase } from '@/integrations/supabase/client';

export const createUserDetailsTable = async (): Promise<{ success: boolean; error?: any }> => {
  try {
    // Vérifie si la table existe déjà
    const { data: tables, error: checkError } = await supabase
      .from('information_schema.tables' as any)
      .select('table_name')
      .eq('table_name', 'user_details')
      .eq('table_schema', 'public');

    if (checkError) {
      console.error('Erreur lors de la vérification de la table user_details:', checkError);
      return { success: false, error: checkError };
    }

    // Si la table n'existe pas, la créer
    if (!tables || tables.length === 0) {
      // Exécuter le SQL pour créer la table
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql_query: `
          CREATE TABLE public.user_details (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            first_name TEXT,
            last_name TEXT,
            phone TEXT,
            address TEXT,
            city TEXT,
            postal_code TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );

          -- Active les mises à jour en temps réel pour la table
          ALTER TABLE public.user_details REPLICA IDENTITY FULL;
          
          -- Ajoute la table à la publication supabase_realtime
          ALTER PUBLICATION supabase_realtime ADD TABLE public.user_details;
          
          -- Ajoute des RLS (Row Level Security) pour la table
          ALTER TABLE public.user_details ENABLE ROW LEVEL SECURITY;
          
          -- Crée une politique permettant aux utilisateurs de voir uniquement leur propre profil
          CREATE POLICY "Users can view their own profile" ON public.user_details
            FOR SELECT USING (auth.uid() = id);
            
          -- Crée une politique permettant aux utilisateurs de mettre à jour uniquement leur propre profil
          CREATE POLICY "Users can update their own profile" ON public.user_details
            FOR UPDATE USING (auth.uid() = id);
        `
      } as any);

      if (createError) {
        console.error('Erreur lors de la création de la table user_details:', createError);
        return { success: false, error: createError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la configuration de la table user_details:', error);
    return { success: false, error };
  }
};
