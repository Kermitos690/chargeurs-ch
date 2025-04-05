import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Users,
  Battery,
  MapPin,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
  Loader2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ManelCRM = () => {
  const { user, isSuperAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Rediriger si l'utilisateur n'est pas un superadmin
  if (!isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="min-h-screen">
      <div className="container py-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manel CRM</h1>
              <p className="text-muted-foreground mt-1">
                Interface d'administration avancée
              </p>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <Separator className="my-4" />
        </header>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="stations">Stations</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total Clients" 
                value="1,245" 
                description="+12% par rapport au mois dernier" 
                icon={<Users className="h-4 w-4 text-primary" />} 
              />
              <StatCard 
                title="Powerbanks Actives" 
                value="862" 
                description="95% de taux d'utilisation" 
                icon={<Battery className="h-4 w-4 text-primary" />} 
              />
              <StatCard 
                title="Stations" 
                value="48" 
                description="3 nouvelles ce mois-ci" 
                icon={<MapPin className="h-4 w-4 text-primary" />} 
              />
              <StatCard 
                title="Revenu Mensuel" 
                value="86,400 CHF" 
                description="+8% par rapport au mois dernier" 
                icon={<CreditCard className="h-4 w-4 text-primary" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>
                    Les dernières activités des utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Battery className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouvelle location</p>
                        <p className="text-xs text-muted-foreground">
                          Client #3457 a loué une powerbank à la station Lausanne Gare
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Il y a 10 minutes</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouveau client</p>
                        <p className="text-xs text-muted-foreground">
                          Marc Dupont s'est inscrit et a souscrit à l'abonnement Premium
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Il y a 42 minutes</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alerte station</p>
                        <p className="text-xs text-muted-foreground">
                          Station Genève Centre signale un niveau de batterie faible
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Il y a 1 heure</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance du système</CardTitle>
                  <CardDescription>
                    Dernières 24 heures
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <PerformanceItem
                      label="Temps de réponse API"
                      value="124ms"
                      percentage={92}
                      improvement={true}
                    />
                    <PerformanceItem
                      label="Disponibilité des stations"
                      value="99.8%"
                      percentage={99}
                      improvement={true}
                    />
                    <PerformanceItem
                      label="Taux de transactions réussies"
                      value="98.5%"
                      percentage={98}
                      improvement={false}
                    />
                    <PerformanceItem
                      label="Utilisation des powerbanks"
                      value="86.2%"
                      percentage={86}
                      improvement={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des clients</CardTitle>
                <CardDescription>
                  Consultez et gérez vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu de la gestion des clients à venir</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stations">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des stations</CardTitle>
                <CardDescription>
                  Consultez et gérez vos stations de recharge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu de la gestion des stations à venir</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytiques</CardTitle>
                <CardDescription>
                  Visualisez les performances de votre réseau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu des analytiques à venir</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
                <CardDescription>
                  Configurez les paramètres avancés du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu des paramètres à venir</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, description, icon }: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const PerformanceItem = ({ label, value, percentage, improvement }: { 
  label: string; 
  value: string; 
  percentage: number; 
  improvement: boolean; 
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full ${improvement ? 'bg-emerald-500' : 'bg-amber-500'}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default ManelCRM;
