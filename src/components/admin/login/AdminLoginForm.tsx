
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertCircle, Lock, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginWithSupabase } from '@/services/supabase/auth';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

interface AdminLoginFormProps {
  setErrorMessage: (message: string | null) => void;
}

const AdminLoginForm = ({ setErrorMessage }: AdminLoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Login with Supabase
      const result = await loginWithSupabase(values.email, values.password);
        
      if (result.success) {
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue dans l\'interface d\'administration',
        });
        navigate('/admin/dashboard');
      } else {
        setErrorMessage((result as any).error || 'Vérifiez vos identifiants');
        toast({
          variant: 'destructive',
          title: 'Erreur de connexion',
          description: (result as any).error || 'Vérifiez vos identifiants',
        });
      }
    } catch (error: any) {
      setErrorMessage('Une erreur est survenue lors de la connexion');
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="admin@chargeurs.ch" 
                  {...field} 
                  type="email"
                  className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Mot de passe</FormLabel>
              <FormControl>
                <Input 
                  placeholder="••••••••" 
                  {...field} 
                  type="password"
                  className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Se connecter
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
