
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetClose, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ShoppingCart, 
  Home, 
  Info, 
  Phone, 
  Store, 
  Shield, 
  Layers 
} from 'lucide-react';

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
          {/* Top Section with Authentication & Main Navigation */}
          <div className="space-y-6 p-4">
            {/* Auth Buttons */}
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
            
            {/* Main Navigation Section */}
            <div className="space-y-1 rounded-md border border-border p-3 bg-muted/20">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Navigation</h4>
              <SheetClose asChild>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  Accueil
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/features" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Fonctionnalités
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Info className="mr-2 h-4 w-4" />
                  À propos
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </NavLink>
              </SheetClose>
            </div>
            
            {/* Products Section */}
            <div className="space-y-1 rounded-md border border-border p-3 bg-muted/20">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Boutique</h4>
              <SheetClose asChild>
                <NavLink 
                  to="/produits" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Store className="mr-2 h-4 w-4" />
                  Tous les produits
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/produits/accessoires" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Accessoires
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/produits/residentiels" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  Résidentiels
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/produits/entreprises" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Entreprises
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink 
                  to="/produits/publiques" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"}`
                  }
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Publiques
                </NavLink>
              </SheetClose>
            </div>
            
            {/* User Account Section */}
            {user && (
              <div className="space-y-1 rounded-md border border-border p-3 bg-muted/20">
                <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Mon compte</h4>
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
                <SheetClose asChild>
                  <button 
                    className="flex items-center w-full p-2 rounded-md text-left hover:bg-accent"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </button>
                </SheetClose>
              </div>
            )}
          </div>
          
          {/* Footer Section */}
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
