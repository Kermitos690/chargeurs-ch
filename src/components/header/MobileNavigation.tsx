
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems } from './navigation-items';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
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
              className="md:hidden hover:bg-primary/5 transition-all duration-300"
            >
              <Menu className="h-5 w-5 text-primary" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white p-4 border-t border-gray-200">
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
                            ? "bg-primary/10 text-primary" 
                            : "text-gray-800 hover:bg-primary/5 hover:text-primary"
                        )}
                      >
                        {item.label}
                      </NavLink>
                    </DrawerClose>
                    
                    {item.children.length > 0 && (
                      <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-2">
                        {item.children.map((child) => (
                          <DrawerClose key={child.path} asChild>
                            <NavLink 
                              to={child.path} 
                              className={({ isActive }) => cn(
                                "block p-2 rounded-md text-sm",
                                isActive 
                                  ? "text-primary font-medium" 
                                  : "text-gray-600 hover:bg-primary/5 hover:text-primary"
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
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="border-primary text-primary hover:bg-primary/5"
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
              className="hover:bg-primary/5"
            >
              {isMenuOpen ? 
                <X className="h-5 w-5 text-primary" /> : 
                <Menu className="h-5 w-5 text-primary" />
              }
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full bg-white p-0 border-b border-gray-200">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200">
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
                            ? "bg-primary/10 text-primary" 
                            : "text-gray-800 hover:bg-primary/5 hover:text-primary"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                      
                      {item.children.length > 0 && (
                        <ul className="pl-4 space-y-1 border-l-2 border-gray-200 ml-2">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink 
                                to={child.path} 
                                className={({ isActive }) => cn(
                                  "block p-2 rounded-md text-sm",
                                  isActive 
                                    ? "text-primary font-medium" 
                                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
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
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                      <AvatarFallback className="bg-primary/20 text-primary">{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-primary">{userData?.name || 'Utilisateur'}</span>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-primary/5 hover:text-primary" 
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4 text-primary" />
                      Profil
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-primary/5 hover:text-primary" 
                      onClick={() => {
                        navigate('/account');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4 text-primary" />
                      Paramètres
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left text-gray-800 hover:bg-primary/5 hover:text-primary" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4 text-primary" />
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
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="text-primary border-primary hover:bg-primary/5"
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
