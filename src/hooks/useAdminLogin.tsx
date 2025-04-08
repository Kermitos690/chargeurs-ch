
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { checkAdminAccountsExist } from '@/services/supabase/initialAdmin';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export const useAdminLogin = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Pulse effect for the logo
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500);
    }, 3000);

    // Vérifier si des comptes admin existent déjà
    const checkAdmins = async () => {
      const exists = await checkAdminAccountsExist();
      setAdminExists(exists);
    };
    
    checkAdmins();
    
    return () => clearInterval(interval);
  }, []);

  return {
    form,
    isPulsing,
    adminExists,
    setAdminExists,
    errorMessage,
    setErrorMessage
  };
};
