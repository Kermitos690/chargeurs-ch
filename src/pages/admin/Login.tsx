
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Battery, Lock, Loader2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { loginWithSupabase } from '@/services/supabase/auth';
import { createAdminImmediately } from '@/services/supabase/setupAdmin';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Pulse effect for the logo
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Try login with Supabase
      const { success, error } = await loginWithSupabase(values.email, values.password);
        
      if (success) {
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue dans l\'interface d\'administration',
        });
        navigate('/admin/dashboard');
      } else {
        // Fallback to Firebase if Supabase login fails
        const firebaseResult = await loginAdmin(values.email, values.password);
        
        if (firebaseResult.success) {
          toast({
            title: 'Connexion réussie (Firebase)',
            description: 'Bienvenue dans l\'interface d\'administration',
          });
          navigate('/admin/dashboard');
        } else {
          toast({
            variant: 'destructive',
            title: 'Erreur de connexion',
            description: error || firebaseResult.error || 'Vérifiez vos identifiants',
          });
        }
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    setIsCreatingAdmin(true);
    try {
      const result = await createAdminImmediately();
      if (result.success) {
        // Préremplir le formulaire avec les identifiants créés
        form.setValue('email', 'chargeurs@proton.me');
        form.setValue('password', 'mdr 11111111');
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte admin:", error);
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <motion.div 
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 ${isPulsing ? 'animate-pulse' : ''}`}
            animate={{
              boxShadow: isPulsing 
                ? ['0 0 0 rgba(59, 130, 246, 0)', '0 0 25px rgba(59, 130, 246, 0.8)', '0 0 5px rgba(59, 130, 246, 0.3)'] 
                : '0 0 0 rgba(59, 130, 246, 0)'
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Battery className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-3xl font-bold text-white"
            variants={itemVariants}
          >
            Administration
            <span className="ml-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              chargeurs.ch
            </span>
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-sm text-gray-400"
            variants={itemVariants}
          >
            Connectez-vous pour accéder au panneau d'administration
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-sm"
          variants={itemVariants}
        >
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
                        placeholder="admin@example.com" 
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
          
          <div className="mt-4 flex justify-center">
            <Button
              type="button"
              onClick={handleCreateAdmin}
              className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-1 focus:ring-gray-400"
              variant="outline"
              size="sm"
              disabled={isCreatingAdmin}
            >
              {isCreatingAdmin ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Settings className="mr-1 h-3 w-3" />
                  Créer compte admin
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className="mt-4 text-center text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>Système d'administration réservé au personnel autorisé</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
