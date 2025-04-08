
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings, HelpCircle, Menu, X, ChevronDown } from 'lucide-react';
import { clearCart } from '@/services/cart'; 
import { toast } from 'sonner';
import CartIcon from './shop/CartIcon';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from '@/services/firebase';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await clearCart(user?.uid); 
      await auth.signOut();
      navigate('/auth/login');
      toast.success("Déconnexion réussie !");
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/features', label: 'Fonctionnalités' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  const productItems = [
    { path: '/produits', label: 'Tous les produits' },
    { path: '/produits/accessoires', label: 'Accessoires' },
    { path: '/produits/residentiels', label: 'Résidentiels' },
    { path: '/produits/entreprises', label: 'Entreprises' },
    { path: '/produits/publiques', label: 'Publiques' },
  ];

  return (
    <header className={`bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
            alt="Chargeurs.ch Logo" 
            className="h-12 w-auto" 
          />
        </Link>
        
        {/* Navigation pour desktop avec NavigationMenu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <NavLink to={item.path}>
                      {item.label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Boutique</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {productItems.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <NavLink
                            to={item.path}
                            className={({ isActive }) => 
                              cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive ? "bg-accent/50" : ""
                              )
                            }
                          >
                            <div className="text-sm font-medium leading-none">{item.label}</div>
                          </NavLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                    <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-border shadow-lg" align="end" forceMount>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/faq')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth/login')} className="hidden sm:flex">
                Se connecter
              </Button>
              <Button size="sm" onClick={() => navigate('/auth/register')} className="hidden sm:flex">
                S'inscrire
              </Button>
            </>
          )}
          
          {/* Menu déroulant de haut en bas */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-16 pb-6 w-full h-[80vh] overflow-y-auto bg-white">
              <div className="flex flex-col h-full">
                <div className="space-y-6 p-4">
                  {!user && (
                    <div className="flex flex-col space-y-2 mb-6">
                      <Button 
                        className="w-full"
                        onClick={() => {
                          navigate('/auth/login');
                          setIsMenuOpen(false);
                        }}
                      >
                        Se connecter
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          navigate('/auth/register');
                          setIsMenuOpen(false);
                        }}
                      >
                        S'inscrire
                      </Button>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
