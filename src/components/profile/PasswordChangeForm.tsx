
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  newPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  confirmPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const PasswordChangeForm: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    // Dans une application réelle, cela appellerait une API pour mettre à jour le mot de passe
    console.log('Password update data:', data);
    
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été changé avec succès."
    });
    
    form.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer de mot de passe</CardTitle>
        <CardDescription>
          Mettez à jour votre mot de passe pour sécuriser votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe actuel</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Mettre à jour le mot de passe
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeForm;
