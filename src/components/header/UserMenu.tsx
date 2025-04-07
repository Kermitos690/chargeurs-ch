
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const UserMenu: React.FC = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        toast({
          variant: "destructive",
          title: "Erreur de déconnexion",
          description: error.message || "Une erreur est survenue lors de la déconnexion"
        });
        return;
      }
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté"
      });
      
      navigate('/');
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur inattendue est survenue"
      });
    }
  };
  
  if (!user) {
    return (
      <>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/auth/login')} 
          className="hidden sm:flex hover:bg-electric-blue/10 hover:text-electric-blue hover:border-electric-blue transition-all duration-300"
        >
          Se connecter
        </Button>
        <Button 
          size="sm" 
          onClick={() => navigate('/auth/register')} 
          className="hidden sm:flex bg-electric-blue hover:bg-electric-blue/90 shadow-electric transition-all duration-300"
        >
          S'inscrire
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-electric-blue/10 transition-all duration-300">
          <Avatar className="h-8 w-8 shadow-electric">
            <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
            <AvatarFallback className="bg-electric-blue/20 text-electric-blue">{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-panel-electric border-electric-blue/30 animate-scale-in" align="end" forceMount>
        <DropdownMenuLabel className="text-electric-blue">Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-electric-blue/20" />
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
        >
          <User className="mr-2 h-4 w-4 text-electric-blue" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/account')}
          className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4 text-electric-blue" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/faq')}
          className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4 text-electric-blue" />
          <span>Aide</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-electric-blue/20" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4 text-electric-blue" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
