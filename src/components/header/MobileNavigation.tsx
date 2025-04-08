
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Home, 
  Info, 
  Phone, 
  User,
  LogOut,
  Settings,
  HelpCircle
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
    <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DrawerTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 h-[85vh] rounded-t-xl">
        <DrawerOverlay className="bg-black/60" />
        
        <div className="h-2 w-12 rounded-full bg-gray-300 mx-auto mb-2 mt-2" />
        
        <div className="overflow-y-auto h-full pb-safe">
          {/* Main Navigation */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Navigation</h2>
            <div className="space-y-1">
              <DrawerClose asChild>
                <NavLink to="/" className={({ isActive }) => 
                  `flex items-center p-3.5 rounded-lg text-base ${isActive 
                    ? "bg-green-50 text-green-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"}`
                }>
                  <Home className="w-5 h-5 mr-3" strokeWidth={1.8} />
                  Accueil
                </NavLink>
              </DrawerClose>
              
              <DrawerClose asChild>
                <NavLink to="/features" className={({ isActive }) => 
                  `flex items-center p-3.5 rounded-lg text-base ${isActive 
                    ? "bg-green-50 text-green-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"}`
                }>
                  <Info className="w-5 h-5 mr-3" strokeWidth={1.8} />
                  Fonctionnalités
                </NavLink>
              </DrawerClose>
              
              <DrawerClose asChild>
                <NavLink to="/about" className={({ isActive }) => 
                  `flex items-center p-3.5 rounded-lg text-base ${isActive 
                    ? "bg-green-50 text-green-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"}`
                }>
                  <Info className="w-5 h-5 mr-3" strokeWidth={1.8} />
                  À propos
                </NavLink>
              </DrawerClose>
              
              <DrawerClose asChild>
                <NavLink to="/contact" className={({ isActive }) => 
                  `flex items-center p-3.5 rounded-lg text-base ${isActive 
                    ? "bg-green-50 text-green-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"}`
                }>
                  <Phone className="w-5 h-5 mr-3" strokeWidth={1.8} />
                  Contact
                </NavLink>
              </DrawerClose>
            </div>
          </div>
          
          <div className="h-px bg-gray-200 mx-6 my-2" />
          
          {/* Boutique Section */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Boutique</h2>
            <div className="space-y-1">
              {productItems.map((item) => (
                <DrawerClose key={item.path} asChild>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `flex items-center p-3.5 rounded-lg text-base ${isActive 
                        ? "bg-green-50 text-green-600 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"}`
                    }
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" strokeWidth={1.8} />
                    {item.label}
                  </NavLink>
                </DrawerClose>
              ))}
            </div>
          </div>
          
          {user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* User Account Section */}
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Mon compte</h2>
                <div className="space-y-1">
                  <DrawerClose asChild>
                    <NavLink to="/profile" className={({ isActive }) => 
                      `flex items-center p-3.5 rounded-lg text-base ${isActive 
                        ? "bg-green-50 text-green-600 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"}`
                    }>
                      <User className="w-5 h-5 mr-3" strokeWidth={1.8} />
                      Profil
                    </NavLink>
                  </DrawerClose>
                  
                  <DrawerClose asChild>
                    <NavLink to="/account" className={({ isActive }) => 
                      `flex items-center p-3.5 rounded-lg text-base ${isActive 
                        ? "bg-green-50 text-green-600 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"}`
                    }>
                      <Settings className="w-5 h-5 mr-3" strokeWidth={1.8} />
                      Paramètres
                    </NavLink>
                  </DrawerClose>
                  
                  <DrawerClose asChild>
                    <NavLink to="/faq" className={({ isActive }) => 
                      `flex items-center p-3.5 rounded-lg text-base ${isActive 
                        ? "bg-green-50 text-green-600 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"}`
                    }>
                      <HelpCircle className="w-5 h-5 mr-3" strokeWidth={1.8} />
                      Aide
                    </NavLink>
                  </DrawerClose>
                  
                  <DrawerClose asChild>
                    <button 
                      className="flex items-center p-3.5 rounded-lg text-base w-full text-left text-gray-700 hover:bg-gray-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5 mr-3" strokeWidth={1.8} />
                      Se déconnecter
                    </button>
                  </DrawerClose>
                </div>
              </div>
            </>
          )}
          
          {!user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* Authentication Section */}
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Connexion</h2>
                <div className="space-y-3">
                  <DrawerClose asChild>
                    <NavLink to="/auth/login" className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium">
                      Se connecter
                    </NavLink>
                  </DrawerClose>
                  
                  <DrawerClose asChild>
                    <NavLink to="/auth/register" className="flex items-center justify-center p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-lg text-base font-medium">
                      S'inscrire
                    </NavLink>
                  </DrawerClose>
                </div>
              </div>
            </>
          )}
          
          {/* Footer */}
          <div className="mt-auto px-6 py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">© 2025 Chargeurs.ch</p>
            <div className="flex justify-center space-x-4 mt-2">
              <DrawerClose asChild>
                <NavLink to="/conditions" className="text-xs text-gray-500 hover:text-gray-800">
                  Conditions
                </NavLink>
              </DrawerClose>
              <DrawerClose asChild>
                <NavLink to="/confidentialite" className="text-xs text-gray-500 hover:text-gray-800">
                  Confidentialité
                </NavLink>
              </DrawerClose>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
