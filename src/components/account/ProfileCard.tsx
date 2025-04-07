
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/services/supabase/profile';

interface ProfileCardProps {
  userData: UserProfile | null;
  user: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData, user }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du profil</CardTitle>
        <CardDescription>
          Consultez et modifiez vos informations personnelles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Nom</h4>
            <p className="text-gray-500">{userData?.firstName || 'Non défini'} {userData?.lastName || ''}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Email</h4>
            <p className="text-gray-500">{user?.email || 'Non défini'}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Téléphone</h4>
            <p className="text-gray-500">{userData?.phone || 'Non défini'}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Adresse</h4>
            <p className="text-gray-500">
              {userData?.address ? (
                <>
                  {userData.address}<br />
                  {userData.postalCode} {userData.city}
                </>
              ) : (
                'Non définie'
              )}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/profile')}>Modifier le profil</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
