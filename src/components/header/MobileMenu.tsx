
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
      <DrawerContent className="p-0 border-0 max-h-[90vh] bg-transparent">
        <div className="bg-gradient-to-b from-green-light via-green-dark to-noir-profond flex flex-col h-full max-h-[85vh] overflow-y-auto pb-6">
          <div className="p-4 border-b border-green-medium/20 flex justify-center">
            <img 
              src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
              alt="Chargeurs.ch Logo" 
              className="h-10 w-auto" 
            />
            <div className="h-1 w-[100px] rounded-full bg-green-light/50 mx-auto absolute -bottom-0.5 animate-pulse-glow"></div>
          </div>
          
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <DrawerClose key={item.path} asChild>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `block w-full text-center py-3 my-1 rounded-md transition-all ${isActive 
                      ? "bg-green-medium/70 text-white shadow-[0_0_12px_rgba(45,140,80,0.8)] animate-green-glow" 
                      : "text-white hover:bg-green-dark/70 hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]"}`
                  }
                >
                  {item.label}
                </NavLink>
              </DrawerClose>
            ))}
          </nav>
          
          {!user && (
            <div className="flex flex-col space-y-3 p-4 border-t border-green-medium/20 mt-auto">
              <Button 
                onClick={() => {
                  navigate('/auth/login');
                }}
                className="w-full bg-green-medium hover:bg-green-dark hover:shadow-[0_0_12px_rgba(45,140,80,0.8)] animate-green-glow"
              >
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/auth/register');
                }}
                className="w-full border-green-medium text-white hover:bg-green-dark/70 hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]"
              >
                S'inscrire
              </Button>
            </div>
          )}

          {user && (
            <div className="p-4 border-t border-green-medium/20 mt-auto">
              <div className="flex items-center space-x-3 mb-4 bg-green-dark/60 p-3 rounded-lg">
                <Avatar className="h-8 w-8 border border-green-light/30 shadow-[0_0_5px_rgba(45,140,80,0.5)]">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-white">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]" 
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]" 
                  onClick={() => {
                    navigate('/account');
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]" 
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
