
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
        <div className="relative flex flex-col h-full max-h-[85vh] overflow-y-auto pb-6 bg-gradient-to-b from-green-light via-green-dark to-noir-profond overflow-hidden">
          {/* Particules animées */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-electric-blue/20 rounded-full blur-xl animate-float-slow"></div>
            <div className="absolute top-[30%] right-[15%] w-20 h-20 bg-green-light/30 rounded-full blur-lg animate-pulse-glow"></div>
            <div className="absolute bottom-[20%] left-[20%] w-32 h-32 bg-green-medium/20 rounded-full blur-xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-[10%] right-[10%] w-16 h-16 bg-bright-blue/20 rounded-full blur-lg animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
          </div>
          
          {/* Lignes de néon animées */}
          <div className="absolute left-0 top-[20%] h-[1px] w-full bg-gradient-to-r from-transparent via-green-light to-transparent opacity-70 animate-pulse-glow"></div>
          <div className="absolute left-0 bottom-[30%] h-[1px] w-full bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-70 animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
          
          <div className="p-4 border-b border-green-medium/20 flex justify-center relative z-10">
            <img 
              src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
              alt="Chargeurs.ch Logo" 
              className="h-10 w-auto" 
            />
            <div className="h-1 w-[100px] rounded-full bg-gradient-to-r from-green-pale via-green-light to-green-pale mx-auto absolute -bottom-0.5 animate-pulse-glow"></div>
          </div>
          
          <nav className="flex flex-col p-4 relative z-10">
            {navItems.map((item, index) => (
              <DrawerClose key={item.path} asChild>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `block w-full text-center py-3 my-1 rounded-md transition-all relative overflow-hidden ${isActive 
                      ? "text-white shadow-[0_0_12px_rgba(45,140,80,0.8)] animate-green-glow" 
                      : "text-white hover:shadow-[0_0_8px_rgba(45,140,80,0.6)]"}`
                  }
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Fond animé pour chaque lien */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-dark/70 via-green-medium/70 to-green-dark/70 -z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-medium/0 via-green-light/30 to-green-medium/0 -z-0 animate-pulse-glow" style={{ animationDelay: `${index * 0.2}s` }}></div>
                </NavLink>
              </DrawerClose>
            ))}
          </nav>
          
          {!user && (
            <div className="flex flex-col space-y-3 p-4 border-t border-green-medium/20 mt-auto relative z-10">
              <Button 
                onClick={() => {
                  navigate('/auth/login');
                }}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10">Se connecter</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-medium via-green-light to-green-medium group-hover:bg-gradient-to-r group-hover:from-green-light group-hover:via-electric-blue group-hover:to-green-light transition-all duration-500"></div>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/auth/register');
                }}
                className="w-full border-green-medium text-white relative overflow-hidden group"
              >
                <span className="relative z-10">S'inscrire</span>
                <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-green-dark/50 via-green-medium/50 to-green-dark/50 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </div>
          )}

          {user && (
            <div className="p-4 border-t border-green-medium/20 mt-auto relative z-10">
              <div className="flex items-center space-x-3 mb-4 bg-gradient-to-r from-green-dark/60 via-green-medium/40 to-green-dark/60 p-3 rounded-lg backdrop-blur-sm">
                <Avatar className="h-8 w-8 border border-green-light/30 shadow-[0_0_5px_rgba(45,140,80,0.5)]">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-white">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 relative overflow-hidden group" 
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  <User className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Profil</span>
                  <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-electric-blue/20 via-green-light/30 to-electric-blue/20 group-hover:opacity-100 transition-opacity"></div>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 relative overflow-hidden group" 
                  onClick={() => {
                    navigate('/account');
                  }}
                >
                  <Settings className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Paramètres</span>
                  <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-electric-blue/20 via-green-light/30 to-electric-blue/20 group-hover:opacity-100 transition-opacity"></div>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/70 relative overflow-hidden group" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Se déconnecter</span>
                  <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-electric-blue/20 via-green-light/30 to-electric-blue/20 group-hover:opacity-100 transition-opacity"></div>
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
