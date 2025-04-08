
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from '@/services/firebase/auth';
import { useToast } from '@/hooks/use-toast';

const AuthSection: React.FC = () => {
  const { user, userData, loading } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Chargement...</h2>
      </div>
    );
  }

  if (user) {
    return (
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Mon compte</h2>
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
            <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{userData?.name || user.displayName || 'Utilisateur'}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <DrawerClose asChild>
            <NavLink 
              to="/profile" 
              className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md active:translate-y-0.5"
              style={{ 
                opacity: 0,
                animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '150ms'
              }}
            >
              Gérer mon profil
            </NavLink>
          </DrawerClose>
          
          <DrawerClose asChild>
            <NavLink 
              to="/account" 
              className="flex items-center justify-center p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md active:translate-y-0.5"
              style={{ 
                opacity: 0,
                animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '225ms'
              }}
            >
              Mon compte
            </NavLink>
          </DrawerClose>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center p-3 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md active:translate-y-0.5"
            onClick={handleLogout}
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '300ms'
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Connexion</h2>
      <div className="space-y-3">
        <DrawerClose asChild>
          <NavLink 
            to="/auth/login" 
            className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md active:translate-y-0.5"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '150ms'
            }}
          >
            Se connecter
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink 
            to="/auth/register" 
            className="flex items-center justify-center p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md active:translate-y-0.5"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '225ms'
            }}
          >
            S'inscrire
          </NavLink>
        </DrawerClose>
      </div>
    </div>
  );
};

export default AuthSection;
