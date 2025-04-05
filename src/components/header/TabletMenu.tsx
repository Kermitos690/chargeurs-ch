
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';

interface TabletMenuProps {
  navItems: { path: string; label: string }[];
  handleLogout: () => Promise<void>;
}

const TabletMenu: React.FC<TabletMenuProps> = ({ navItems, handleLogout }) => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild className="hidden md:inline-flex lg:hidden">
        <Button variant="ghost" size="icon">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 border-r-0 overflow-y-auto">
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Fond de dégradé animé */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-light via-green-dark to-noir-profond z-0"></div>
          
          {/* Effet de lueur animée */}
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-green-light/20 rounded-full blur-xl animate-float-slow"></div>
            <div className="absolute top-[40%] right-[5%] w-24 h-24 bg-electric-blue/20 rounded-full blur-xl animate-pulse-glow"></div>
            <div className="absolute bottom-[20%] left-[15%] w-48 h-48 bg-green-medium/15 rounded-full blur-xl animate-float-slow" style={{ animationDelay: "2.5s" }}></div>
            <div className="absolute bottom-[30%] right-[20%] w-20 h-20 bg-bright-blue/25 rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: "1.2s" }}></div>
          </div>
          
          {/* Lignes de néon horizontales */}
          <div className="absolute left-0 top-[15%] h-[1px] w-full bg-gradient-to-r from-transparent via-green-light to-transparent opacity-60 animate-pulse-glow"></div>
          <div className="absolute left-0 bottom-[25%] h-[1px] w-full bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-60 animate-pulse-glow" style={{ animationDelay: "1.8s" }}></div>
          <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-green-light to-transparent opacity-40 animate-pulse-glow" style={{ animationDelay: "0.8s" }}></div>
          <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-electric-blue to-transparent opacity-40 animate-pulse-glow" style={{ animationDelay: "2.2s" }}></div>
          
          <div className="p-4 border-b border-green-medium/20 flex justify-center relative z-10">
            <img 
              src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
              alt="Chargeurs.ch Logo" 
              className="h-10 w-auto" 
            />
            <div className="h-1 w-[120px] rounded-full bg-gradient-to-r from-green-medium via-green-light to-green-medium mx-auto absolute -bottom-0.5 animate-pulse-glow"></div>
          </div>
          
          <nav className="flex-1 p-4 relative z-10">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `block text-center py-3 my-1 rounded-md transition-all relative overflow-hidden ${isActive 
                        ? "text-white shadow-[0_0_12px_rgba(45,140,80,0.8)]" 
                        : "text-white"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Fond animé pour chaque lien */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-dark/80 via-green-medium/80 to-green-dark/80 -z-0`}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-medium/0 via-green-light/40 to-green-medium/0 -z-0 animate-pulse-glow" style={{ animationDelay: `${index * 0.3}s` }}></div>
                    {/* Effet de bordure animé sur hover */}
                    <div className="absolute bottom-0 left-[50%] right-[50%] h-[2px] bg-electric-blue group-hover:left-0 group-hover:right-0 transition-all duration-300"></div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {user ? (
            <div className="p-4 border-t border-green-medium/20 mt-auto relative z-10">
              <div className="flex items-center space-x-3 mb-4 backdrop-blur-sm rounded-lg p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-dark/60 via-green-medium/40 to-green-dark/60 -z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-dark/0 via-green-light/20 to-green-dark/0 -z-0 animate-pulse-glow"></div>
                <Avatar className="h-8 w-8 border border-green-light/30 shadow-[0_0_5px_rgba(45,140,80,0.5)] relative z-10">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-white relative z-10">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white group relative overflow-hidden" 
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-green-dark/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-medium/0 via-electric-blue/30 to-green-medium/0 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                  <User className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Profil</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white group relative overflow-hidden" 
                  onClick={() => {
                    navigate('/account');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-green-dark/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-medium/0 via-electric-blue/30 to-green-medium/0 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                  <Settings className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Paramètres</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white group relative overflow-hidden" 
                  onClick={handleLogout}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-green-dark/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-medium/0 via-electric-blue/30 to-green-medium/0 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                  <LogOut className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Se déconnecter</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-green-medium/20 mt-auto relative z-10">
              <div className="space-y-3">
                <Button 
                  className="w-full relative overflow-hidden group"
                  onClick={() => {
                    navigate('/auth/login');
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="relative z-10">Se connecter</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-medium via-green-light to-green-medium transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-green-medium text-white relative overflow-hidden group"
                  onClick={() => {
                    navigate('/auth/register');
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="relative z-10">S'inscrire</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TabletMenu;
