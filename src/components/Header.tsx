
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
import { LogOut, User, Settings, HelpCircle, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { clearCart } from '@/services/cart'; 
import { toast } from 'sonner';
import CartIcon from './shop/CartIcon';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutFromSupabase } from '@/services/supabase/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from '@/lib/utils';

const Header = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      if (user?.id) {
        await clearCart(user.id); 
      }
      await logoutFromSupabase();
      navigate('/auth/login');
      toast.success("Déconnexion réussie !");
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const navItems = [
    { path: '/', label: 'Accueil', children: [] },
    { 
      path: '/features', 
      label: 'Fonctionnalités', 
      children: [
        { path: '/features/charging', label: 'Recharge rapide' },
        { path: '/features/connectivity', label: 'Connectivité' },
        { path: '/features/security', label: 'Sécurité' }
      ] 
    },
    { 
      path: '/about', 
      label: 'À propos', 
      children: [
        { path: '/about/company', label: 'Notre entreprise' },
        { path: '/about/team', label: 'Équipe' },
        { path: '/about/history', label: 'Histoire' }
      ] 
    },
    { 
      path: '/contact', 
      label: 'Contact',
      children: [] 
    },
    { 
      path: '/produits', 
      label: 'Boutique',
      children: [
        { path: '/produits/accessoires', label: 'Accessoires' },
        { path: '/produits/residentiels', label: 'Chargeurs résidentiels' },
        { path: '/produits/entreprises', label: 'Solutions entreprises' },
        { path: '/produits/publiques', label: 'Bornes publiques' }
      ] 
    },
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
            alt="Chargeurs.ch Logo" 
            className="h-12 w-auto" 
          />
        </Link>
        
        {/* Navigation avec menu néon pour desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            item.children.length > 0 ? (
              <DropdownMenu key={item.path}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`group relative flex items-center px-3 py-2 rounded-md transition-all duration-300 overflow-hidden ${
                      location.pathname === item.path || location.pathname.startsWith(item.path + '/') 
                      ? "bg-electric-blue text-primary-foreground shadow-electric animate-electric-pulse" 
                      : "hover:bg-electric-blue/10 hover:text-electric-blue"
                    }`}
                  >
                    <div className="relative z-10 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1.5 transition-all duration-500 group-hover:text-electric-blue" />
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                    
                    {/* Effet de fond néon sur hover */}
                    <div className="absolute inset-0 bg-gradient-electric opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 glass-panel-electric animate-scale-in rounded-lg shadow-elevation-electric"
                >
                  <DropdownMenuItem asChild className="electric-glow">
                    <NavLink 
                      to={item.path} 
                      className="w-full font-medium hover:bg-electric-blue/10 hover:text-electric-blue transition-colors"
                    >
                      <span className="text-gradient-electric">Tous les {item.label.toLowerCase()}</span>
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-electric-blue/20" />
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.path} asChild>
                      <NavLink 
                        to={child.path} 
                        className={({ isActive }) => cn(
                          "w-full hover:bg-electric-blue/10 transition-all duration-200",
                          isActive 
                            ? "text-electric-blue font-medium electric-glow" 
                            : "hover:text-electric-blue"
                        )}
                      >
                        {child.label}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({ isActive }) => cn(
                  "group relative flex items-center px-3 py-2 rounded-md transition-all duration-300 overflow-hidden",
                  isActive 
                    ? "bg-electric-blue text-primary-foreground shadow-electric animate-electric-pulse" 
                    : "hover:bg-electric-blue/10 hover:text-electric-blue"
                )}
              >
                <div className="relative z-10 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5 transition-all duration-500 group-hover:text-electric-blue" />
                  {item.label}
                </div>
                
                {/* Effet de fond néon sur hover */}
                <div className="absolute inset-0 bg-gradient-electric opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </NavLink>
            )
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-electric-blue/10 transition-all duration-300">
                  <Avatar className="h-8 w-8 shadow-electric">
                    <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                    <AvatarFallback className="bg-electric-blue/20 text-electric-blue">{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-panel-electric border-electric-blue/30 animate-scale-in" align="end" forceMount>
                <DropdownMenuLabel className="text-electric-blue">Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-electric-blue/20" />
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4 text-electric-blue" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/account')}
                  className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4 text-electric-blue" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/faq')}
                  className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
                >
                  <HelpCircle className="mr-2 h-4 w-4 text-electric-blue" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-electric-blue/20" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4 text-electric-blue" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/auth/login')} 
                className="hidden sm:flex hover:bg-electric-blue/10 hover:text-electric-blue hover:border-electric-blue transition-all duration-300"
              >
                Se connecter
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/auth/register')} 
                className="hidden sm:flex bg-electric-blue hover:bg-electric-blue/90 shadow-electric transition-all duration-300"
              >
                S'inscrire
              </Button>
            </>
          )}
          
          {/* Menu mobile avec Drawer en bas pour mobile */}
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
                    {navItems.map((item) => (
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
                          navigate('/auth/login');
                          setIsMenuOpen(false);
                        }}
                        className="bg-electric-blue text-white hover:bg-electric-blue/90 shadow-electric"
                      >
                        Se connecter
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate('/auth/register');
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
                    <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                      <img 
                        src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
                        alt="Chargeurs.ch Logo" 
                        className="h-10 w-auto" 
                      />
                    </Link>
                  </div>
                  <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                      {navItems.map((item) => (
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
                          navigate('/auth/login');
                          setIsMenuOpen(false);
                        }}
                        className="bg-electric-blue text-white hover:bg-electric-blue/90 shadow-electric"
                      >
                        Se connecter
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate('/auth/register');
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
        </div>
      </div>
    </header>
  );
};

export default Header;
