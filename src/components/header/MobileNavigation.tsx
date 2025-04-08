
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetClose, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, HelpCircle, LogOut } from 'lucide-react';

type NavItem = {
  path: string;
  label: string;
};

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  navItems: NavItem[];
  productItems: NavItem[];
  user: any;
  handleLogout: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  navItems, 
  productItems,
  user,
  handleLogout
}) => {
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="top" 
        className="pt-16 pb-6 w-full h-[90vh] overflow-y-auto bg-white border-none shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="space-y-6 p-4">
            {!user && (
              <div className="flex flex-col space-y-2 mb-6">
                <SheetClose asChild>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    asChild
                  >
                    <NavLink to="/auth/login">Se connecter</NavLink>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <NavLink to="/auth/register">S'inscrire</NavLink>
                  </Button>
                </SheetClose>
              </div>
            )}
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Navigation</h4>
              {navItems.map((item) => (
                <SheetClose key={item.path} asChild>
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
                </SheetClose>
              ))}
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Boutique</h4>
              {productItems.map((item) => (
                <SheetClose key={item.path} asChild>
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
                </SheetClose>
              ))}
            </div>
            
            {user && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Mon compte</h4>
                <SheetClose asChild>
                  <NavLink 
                    to="/profile" 
                    className={({ isActive }) => 
                      `flex items-center p-2 rounded-md ${isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"}`
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink 
                    to="/account" 
                    className={({ isActive }) => 
                      `flex items-center p-2 rounded-md ${isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"}`
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink 
                    to="/faq" 
                    className={({ isActive }) => 
                      `flex items-center p-2 rounded-md ${isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"}`
                    }
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Aide
                  </NavLink>
                </SheetClose>
                <button 
                  className="flex items-center w-full p-2 rounded-md text-left hover:bg-accent"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-auto p-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">© 2025 Chargeurs.ch</p>
              <div className="flex justify-center space-x-4 mt-2">
                <SheetClose asChild>
                  <NavLink to="/conditions" className="text-xs text-muted-foreground hover:text-primary">
                    Conditions d'utilisation
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink to="/confidentialite" className="text-xs text-muted-foreground hover:text-primary">
                    Confidentialité
                  </NavLink>
                </SheetClose>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;

