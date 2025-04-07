
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BadgeCheck } from 'lucide-react';
import { Subscription } from '@/types/api';
import { useNavigate } from 'react-router-dom';

interface SubscriptionCardProps {
  userSubscription: Subscription | null;
  loadingSubscription: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  userSubscription,
  loadingSubscription
}) => {
  const navigate = useNavigate();

  if (loadingSubscription) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Chargement des informations d'abonnement...</span>
      </div>
    );
  }

  if (!userSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aucun abonnement actif</CardTitle>
          <CardDescription>
            Découvrez nos différentes formules d'abonnement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Vous n'avez pas encore souscrit à un abonnement. Découvrez nos offres pour profiter pleinement de nos services.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/subscriptions')}>
            Voir les abonnements
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votre Abonnement</CardTitle>
        <CardDescription>
          Détails et statut de votre abonnement actuel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Plan</span>
          <span>{userSubscription.name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Tarif</span>
          <span>{userSubscription.price} CHF / {userSubscription.duration === 'monthly' ? 'mois' : 'année'}</span>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Fonctionnalités incluses:</h4>
          <ul className="space-y-2">
            {userSubscription.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <BadgeCheck className="h-4 w-4 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Changer de plan</Button>
        <Button variant="destructive">Annuler l'abonnement</Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
