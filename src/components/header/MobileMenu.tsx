
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
      <DrawerContent className="bg-gradient-to-b from-green-dark to-noir-profond p-4">
        <div className="flex flex-col h-full space-y-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <DrawerClose key={item.path} asChild>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `block p-2 rounded-md ${isActive 
                      ? "bg-green-medium/70 text-white shadow-[0_0_8px_rgba(45,140,80,0.7)]" 
                      : "text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]"}`
                  }
                >
                  {item.label}
                </NavLink>
              </DrawerClose>
            ))}
          </nav>
          
          {!user && (
            <div className="flex flex-col space-y-3 pt-4">
              <Button 
                onClick={() => {
                  navigate('/auth/login');
                }}
                className="bg-green-medium hover:bg-green-dark hover:shadow-[0_0_8px_rgba(45,140,80,0.7)]"
              >
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/auth/register');
                }}
                className="border-green-medium text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]"
              >
                S'inscrire
              </Button>
            </div>
          )}

          {user && (
            <div className="pt-4">
              <div className="flex items-center space-x-3 mb-4 bg-green-dark/40 p-3 rounded-lg">
                <Avatar className="h-8 w-8 border border-green-light/30 shadow-[0_0_5px_rgba(45,140,80,0.3)]">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-white">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]" 
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]" 
                  onClick={() => {
                    navigate('/account');
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]" 
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
