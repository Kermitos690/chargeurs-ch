
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';

interface MobileMenuProps {
  navItems: { path: string; label: string }[];
  handleLogout: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, handleLogout }) => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-background p-4">
        <div className="flex flex-col h-full space-y-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <DrawerClose key={item.path} asChild>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `block p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  {item.label}
                </NavLink>
              </DrawerClose>
            ))}
          </nav>
          
          {!user && (
            <div className="flex flex-col space-y-2 pt-4">
              <Button 
                onClick={() => {
                  navigate('/auth/login');
                }}
              >
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/auth/register');
                }}
              >
                S'inscrire
              </Button>
            </div>
          )}

          {user && (
            <div className="pt-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left" 
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left" 
                  onClick={() => {
                    navigate('/account');
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
