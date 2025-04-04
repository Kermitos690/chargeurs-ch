
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '@/services/firebase/auth';

const formSchema = z.object({
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get oobCode from URL
  const oobCode = new URLSearchParams(location.search).get('oobCode');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!oobCode) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Code de réinitialisation invalide. Veuillez réessayer.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await resetPassword(oobCode, data.password);
      
      if (result && result.success) {
        toast({
          title: "Mot de passe réinitialisé",
          description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
        });
        setTimeout(() => navigate('/auth/login'), 2000);
      } else {
        const errorMessage = result && result.error 
          ? result.error
          : "Une erreur est survenue lors de la réinitialisation du mot de passe.";
          
        toast({
          variant: "destructive",
          title: "Erreur",
          description: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-electric-green">
      <div className="w-full max-w-md p-4">
        <Card className="glass-panel bg-white bg-opacity-20 backdrop-blur-md border-electric-blue/20 shadow-elevation-electric">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-electric-gradient">Nouveau mot de passe</CardTitle>
            <CardDescription className="text-center">
              Créez un nouveau mot de passe sécurisé pour votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Entrez votre nouveau mot de passe"
                              {...field}
                              className="pr-10 bg-white bg-opacity-60"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmez le mot de passe</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirmez votre mot de passe"
                              {...field}
                              className="pr-10 bg-white bg-opacity-60"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-electric hover:shadow-electric transition-all" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Traitement en cours..." : "Réinitialiser le mot de passe"}
                  <Lock className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center">
              Vous allez être redirigé vers la page de connexion après la réinitialisation
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewPassword;
