import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems } from './navigation-items';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, X, Sparkles, User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => Promise<void>;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  handleLogout 
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, userData } = useAuth();

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-electric-blue/10 transition-all duration-300"
            >
              <Menu className="h-5 w-5 text-electric-blue" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white p-4 border-t border-electric-blue/30">
            <div className="flex flex-col h-full space-y-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.path} className="space-y-1">
                    <DrawerClose asChild>
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => cn(
                          "flex items-center p-2 rounded-md font-medium",
                          isActive 
                            ? "bg-electric-blue text-white shadow-electric" 
                            : "text-gray-800 hover:bg-electric-blue/10 hover:text-electric-blue"
                        )}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {item.label}
                      </NavLink>
                    </DrawerClose>
                    
                    {item.children.length > 0 && (
                      <div className="pl-4 space-y-1 border-l-2 border-electric-blue/30 ml-2">
                        {item.children.map((child) => (
                          <DrawerClose key={child.path} asChild>
                            <NavLink 
                              to={child.path} 
                              className={({ isActive }) => cn(
                                "block p-2 rounded-md text-sm",
                                isActive 
                                  ? "text-electric-blue font-medium" 
                                  : "text-gray-600 hover:bg-electric-blue/10 hover:text-electric-blue"
                              )}
                            >
                              {child.label}
                            </NavLink>
                          </DrawerClose>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="bg-electric-blue text-white hover:bg-electric-blue/90 shadow-electric"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="text-electric-blue border-electric-blue hover:bg-electric-blue/10"
                  >
                    S'inscrire
                  </Button>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-electric-blue/10"
            >
              {isMenuOpen ? 
                <X className="h-5 w-5 text-electric-blue" /> : 
                <Menu className="h-5 w-5 text-electric-blue" />
              }
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-white p-0 border-r border-electric-blue/30">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-electric-blue/30">
                <NavLink to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <img 
                    src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
                    alt="Chargeurs.ch Logo" 
                    className="h-10 w-auto" 
                  />
                </NavLink>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.path} className="space-y-1">
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => cn(
                          "flex items-center p-2 rounded-md font-medium",
                          isActive 
                            ? "bg-electric-blue text-white shadow-electric" 
                            : "text-gray-800 hover:bg-electric-blue/10 hover:text-electric-blue"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {item.label}
                      </NavLink>
                      
                      {item.children.length > 0 && (
                        <ul className="pl-4 space-y-1 border-l-2 border-electric-blue/30 ml-2">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink 
                                to={child.path} 
                                className={({ isActive }) => cn(
                                  "block p-2 rounded-md text-sm",
                                  isActive 
                                    ? "text-electric-blue font-medium" 
                                    : "text-gray-600 hover:bg-electric-blue/10 hover:text-electric-blue"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              {user ? (
                <div className="p-4 border-t border-electric-blue/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-8 w-8 shadow-electric">
                      <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                      <AvatarFallback className="bg-electric-blue/20 text-electric-blue">{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-electric-blue">{userData?.name || 'Utilisateur'}</span>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-electric-blue/10 hover:text-electric-blue" 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4 text-electric-blue" />
                      Profil
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-electric-blue/10 hover:text-electric-blue" 
                      onClick={() => {
                        navigate('/account');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4 text-electric-blue" />
                      Paramètres
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-electric-blue/10 hover:text-electric-blue" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4 text-electric-blue" />
                      Se déconnecter
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
                  <Button 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="bg-electric-blue text-white hover:bg-electric-blue/90 shadow-electric"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="text-electric-blue border-electric-blue hover:bg-electric-blue/10"
                  >
                    S'inscrire
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default MobileNavigation;
