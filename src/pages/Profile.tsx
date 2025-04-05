
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, updateUserProfile, updateUserPassword } from '@/services/supabase/profile';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }).optional().or(z.literal('')),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }).optional().or(z.literal('')),
  email: z.string().email({ message: 'Adresse email invalide' }).optional(),
  phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }).optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  postalCode: z.string().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  newPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  confirmPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setLoading(true);
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserData(profile);
            
            profileForm.reset({
              firstName: profile.first_name || '',
              lastName: profile.last_name || '',
              email: user.email || '',
              phone: profile.phone || '',
              address: profile.address || '',
              city: profile.city || '',
              postalCode: profile.postal_code || '',
            });
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les données du profil",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, profileForm, toast]);

  const onSubmitProfile = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setSavingProfile(true);
    try {
      const result = await updateUserProfile(user.uid, {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postal_code: data.postalCode,
      });

      if (result.success) {
        toast({
          title: "Profile mis à jour",
          description: "Vos informations ont été mises à jour avec succès."
        });
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la mise à jour de votre profil.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de votre profil.",
        variant: "destructive"
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    setSavingPassword(true);
    try {
      const result = await updateUserPassword(data.currentPassword, data.newPassword);
      
      if (result.success) {
        toast({
          title: "Mot de passe mis à jour",
          description: "Votre mot de passe a été changé avec succès."
        });
        
        passwordForm.reset({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la mise à jour de votre mot de passe.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de votre mot de passe.",
        variant: "destructive"
      });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4">Chargement de votre profil...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <Link to="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Retour à mon compte
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mon Profil</h1>
            <p className="text-lg text-muted-foreground">
              Gérez vos informations personnelles et de sécurité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre prénom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre email" {...field} readOnly disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro de téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="border-t pt-6 mt-6">
                        <h3 className="font-medium mb-4">Adresse</h3>
                        
                        <FormField
                          control={profileForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rue</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre adresse" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <FormField
                            control={profileForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ville" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Code postal</FormLabel>
                                <FormControl>
                                  <Input placeholder="Code postal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full md:w-auto" disabled={savingProfile}>
                        {savingProfile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Enregistrer les modifications
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Changer de mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
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
                        control={passwordForm.control}
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
                        control={passwordForm.control}
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
                      
                      <Button type="submit" className="w-full" disabled={savingPassword}>
                        {savingPassword ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mise à jour...
                          </>
                        ) : (
                          "Mettre à jour le mot de passe"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Gérez vos préférences de notification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emails de confirmation</p>
                      <p className="text-sm text-muted-foreground">Recevoir un email de confirmation pour chaque location</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications de rappel</p>
                      <p className="text-sm text-muted-foreground">Rappels pour les locations de longue durée</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Offres promotionnelles</p>
                      <p className="text-sm text-muted-foreground">Recevoir des offres spéciales et promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Enregistrer les préférences
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
