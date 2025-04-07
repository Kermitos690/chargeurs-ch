
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, CreditCard, Clock, User, Package, Settings } from 'lucide-react';
import { UserProfile } from '@/services/supabase/profile';
import { Subscription } from '@/types/api';
import { useNavigate } from 'react-router-dom';

interface AccountOverviewProps {
  userData: UserProfile | null;
  userSubscription: Subscription | null;
  loadingSubscription: boolean;
  user: any;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  userData,
  userSubscription,
  loadingSubscription,
  user
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue, {user?.displayName || userData?.firstName || 'Utilisateur'}</CardTitle>
        <CardDescription>Gérez votre compte et vos services</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnement</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingSubscription ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Chargement...</span>
              </div>
            ) : userSubscription ? (
              <>
                <p className="text-xl font-bold">{userSubscription.name}</p>
                <p className="text-xs text-muted-foreground">
                  Renouvellement: {userSubscription.duration === 'monthly' ? 'Mensuel' : 'Annuel'}
                </p>
              </>
            ) : (
              <p>Aucun abonnement actif</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Factures récentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+2350</p>
            <p className="text-xs text-muted-foreground">
              Chiffre d'affaires réalisé
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Crédit disponible
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+29%</p>
            <p className="text-xs text-muted-foreground">
              Depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dernière connexion
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Il y a 2 jours</p>
            <p className="text-xs text-muted-foreground">
              10:23:03
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user?.email}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-primary flex items-center"
              onClick={() => navigate('/profile')}
            >
              <Settings className="h-4 w-4 mr-1" /> Gérer le profil
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AccountOverview;
