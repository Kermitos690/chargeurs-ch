
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
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0 border-r-0 overflow-y-auto bg-gradient-to-b from-green-dark to-noir-profond">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-green-medium/20">
            <img 
              src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
              alt="Chargeurs.ch Logo" 
              className="h-10 w-auto" 
            />
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `block p-2 rounded-md transition-all ${isActive 
                        ? "bg-green-medium/70 text-white shadow-[0_0_8px_rgba(45,140,80,0.7)]" 
                        : "text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {user ? (
            <div className="p-4 border-t border-green-medium/20">
              <div className="flex items-center space-x-3 mb-4 bg-green-dark/40 p-3 rounded-lg">
                <Avatar className="h-8 w-8 border border-green-light/30 shadow-[0_0_5px_rgba(45,140,80,0.3)]">
                  <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                  <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-white">{userData?.name || 'Utilisateur'}</span>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]" 
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
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
                    setIsMenuOpen(false);
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
          ) : (
            <div className="p-4 border-t border-green-medium/20 flex flex-col space-y-3">
              <Button 
                className="bg-green-medium hover:bg-green-dark hover:shadow-[0_0_8px_rgba(45,140,80,0.7)]"
                onClick={() => {
                  navigate('/auth/login');
                  setIsMenuOpen(false);
                }}
              >
                Se connecter
              </Button>
              <Button 
                variant="outline"
                className="border-green-medium text-white hover:bg-green-dark/50 hover:shadow-[0_0_5px_rgba(45,140,80,0.5)]"
                onClick={() => {
                  navigate('/auth/register');
                  setIsMenuOpen(false);
                }}
              >
                S'inscrire
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TabletMenu;
