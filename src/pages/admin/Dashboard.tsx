
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Battery,
  LogOut,
  Users,
  Map,
  Calendar,
  Settings,
  CreditCard,
  BarChart3,
  Shield,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const { success } = await logoutAdmin();
      if (success) {
        toast({
          title: 'Déconnexion réussie',
        });
        navigate('/admin/login');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la déconnexion',
      });
    }
  };

  const adminModules = [
    {
      title: 'Utilisateurs',
      description: 'Gérer les comptes utilisateurs',
      icon: <Users className="h-8 w-8" />,
      path: '/admin/users',
    },
    {
      title: 'Stations',
      description: 'Gérer les bornes de recharge',
      icon: <Map className="h-8 w-8" />,
      path: '/admin/stations',
    },
    {
      title: 'Réservations',
      description: 'Voir les réservations actuelles',
      icon: <Calendar className="h-8 w-8" />,
      path: '/admin/reservations',
    },
    {
      title: 'Paiements',
      description: 'Suivi des transactions',
      icon: <CreditCard className="h-8 w-8" />,
      path: '/admin/payments',
    },
    {
      title: 'Statistiques',
      description: 'Analyses et rapports',
      icon: <BarChart3 className="h-8 w-8" />,
      path: '/admin/statistics',
    },
    {
      title: 'Paramètres',
      description: 'Configuration du système',
      icon: <Settings className="h-8 w-8" />,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Battery className="mr-2 h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Administration chargeurs.ch</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Bienvenue sur le panneau d'administration de chargeurs.ch
          </p>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module) => (
            <Card 
              key={module.title}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(module.path)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
                <div className="text-primary">{module.icon}</div>
              </CardHeader>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
