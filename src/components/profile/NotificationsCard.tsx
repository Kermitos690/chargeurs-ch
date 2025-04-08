
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NotificationToggleProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ 
  title, 
  description, 
  defaultChecked = false 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );
};

const NotificationsCard: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Gérez vos préférences de notification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <NotificationToggle 
          title="Emails de confirmation"
          description="Recevoir un email de confirmation pour chaque location"
          defaultChecked
        />
        
        <NotificationToggle 
          title="Notifications de rappel"
          description="Rappels pour les locations de longue durée"
          defaultChecked
        />
        
        <NotificationToggle 
          title="Offres promotionnelles"
          description="Recevoir des offres spéciales et promotions"
        />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Enregistrer les préférences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsCard;
