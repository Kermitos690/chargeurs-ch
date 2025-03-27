
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { User, CreditCard, Shield, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  // Mock user ID for demo - would come from auth in a real app
  const userId = "user123";
  
  const { data: userData, isLoading, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserProfile(userId),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Update form when data is loaded
  React.useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
        country: user.address?.country || '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        }
      };
      
      await updateUserProfile(userId, updateData);
      await refetch();
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mon Profil</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gérez vos informations personnelles et vos préférences de compte.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4">Chargement de votre profil...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-destructive">
              <p>Une erreur est survenue lors du chargement de votre profil.</p>
              <Button 
                onClick={() => refetch()} 
                variant="outline" 
                className="mt-4"
              >
                Réessayer
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="personal" className="mb-16">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="personal">Profil</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <div className="bg-card border rounded-lg shadow-sm max-w-2xl mx-auto p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Informations personnelles</h2>
                      <p className="text-muted-foreground">Mettez à jour vos informations personnelles</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                      
                      <div className="grid gap-3">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="+41 XX XXX XX XX"
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Adresse</h2>
                        <p className="text-muted-foreground">Mettez à jour votre adresse</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-6 mb-6">
                      <div className="grid gap-3">
                        <Label htmlFor="street">Rue</Label>
                        <Input 
                          id="street" 
                          name="street" 
                          value={formData.street} 
                          onChange={handleChange} 
                          placeholder="Rue et numéro"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input 
                            id="postalCode" 
                            name="postalCode" 
                            value={formData.postalCode} 
                            onChange={handleChange} 
                            placeholder="1234"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="city">Ville</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                            placeholder="Votre ville"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        <Label htmlFor="country">Pays</Label>
                        <Input 
                          id="country" 
                          name="country" 
                          value={formData.country} 
                          onChange={handleChange} 
                          placeholder="Pays"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-6">
                <div className="bg-card border rounded-lg shadow-sm max-w-2xl mx-auto p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Moyens de paiement</h2>
                      <p className="text-muted-foreground">Gérez vos moyens de paiement</p>
                    </div>
                  </div>
                  
                  {userData?.data?.paymentMethod ? (
                    <div className="border rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted p-2 rounded">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{userData.data.paymentMethod.type}</p>
                            <p className="text-sm text-muted-foreground">**** **** **** {userData.data.paymentMethod.lastFour}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Supprimer</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg border-dashed mb-6">
                      <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">Aucun moyen de paiement enregistré</p>
                      <Button>Ajouter un moyen de paiement</Button>
                    </div>
                  )}
                  
                  <Separator className="my-6" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-lg font-semibold">Historique de facturation</h3>
                  </div>
                  
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune facture disponible pour le moment.
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <div className="bg-card border rounded-lg shadow-sm max-w-2xl mx-auto p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Sécurité</h2>
                      <p className="text-muted-foreground">Gérez la sécurité de votre compte</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mot de passe</h3>
                      <p className="text-muted-foreground mb-4">Changez votre mot de passe régulièrement pour plus de sécurité.</p>
                      <Button>Changer le mot de passe</Button>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Authentification à deux facteurs</h3>
                      <p className="text-muted-foreground mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                      <Button variant="outline">Activer l'authentification à deux facteurs</Button>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-destructive">Supprimer le compte</h3>
                      <p className="text-muted-foreground mb-4">Supprimer définitivement votre compte et toutes vos données.</p>
                      <Button variant="destructive">Supprimer mon compte</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
