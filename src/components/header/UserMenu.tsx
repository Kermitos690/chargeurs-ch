
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
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface UserData {
  name?: string;
}

interface UserMenuProps {
  user: any;
  userData: UserData | null;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, userData, handleLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Button variant="outline" size="sm" onClick={() => navigate('/auth/login')} className="hidden sm:flex">
          Se connecter
        </Button>
        <Button size="sm" onClick={() => navigate('/auth/register')} className="hidden sm:flex">
          S'inscrire
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
            <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border-border shadow-lg" align="end" forceMount>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/account')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/faq')}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Aide</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
