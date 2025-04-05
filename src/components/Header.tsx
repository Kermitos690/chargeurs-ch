
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from '@/services/firebase';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

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
        
        {/* Navigation pour desktop avec menu déroulant */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            item.children.length > 0 ? (
              <DropdownMenu key={item.path}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === item.path ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}>
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-border shadow-lg">
                  <DropdownMenuItem asChild>
                    <NavLink to={item.path} className="w-full">
                      Tous les {item.label.toLowerCase()}
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.path} asChild>
                      <NavLink to={child.path} className="w-full">
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
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md ${isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"}`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}
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
              <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="end" forceMount>
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
                <DropdownMenuItem onClick={handleLogout}>
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
          
          {/* Menu mobile avec Drawer en bas pour mobile et Sheet sur le côté pour tablette */}
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-background p-4">
                <div className="flex flex-col h-full space-y-4">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <div key={item.path} className="space-y-1">
                        <DrawerClose asChild>
                          <NavLink 
                            to={item.path} 
                            className={({ isActive }) => 
                              `block p-2 rounded-md font-medium ${isActive 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-accent"}`
                            }
                          >
                            {item.label}
                          </NavLink>
                        </DrawerClose>
                        
                        {item.children.length > 0 && (
                          <div className="pl-4 space-y-1 border-l-2 border-muted ml-2">
                            {item.children.map((child) => (
                              <DrawerClose key={child.path} asChild>
                                <NavLink 
                                  to={child.path} 
                                  className={({ isActive }) => 
                                    `block p-2 rounded-md text-sm ${isActive 
                                      ? "bg-primary text-primary-foreground" 
                                      : "hover:bg-accent"}`
                                  }
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
                    <div className="flex flex-col space-y-2 pt-4">
                      <Button 
                        onClick={() => {
                          navigate('/auth/login');
                          setIsMenuOpen(false);
                        }}
                      >
                        Se connecter
                      </Button>
                      <Button 
                        variant="outline" 
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
              </DrawerContent>
            </Drawer>
          ) : (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] bg-background p-0 border-r">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
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
                            className={({ isActive }) => 
                              `block p-2 rounded-md font-medium ${isActive 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-accent"}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </NavLink>
                          
                          {item.children.length > 0 && (
                            <ul className="pl-4 space-y-1 border-l-2 border-muted ml-2">
                              {item.children.map((child) => (
                                <li key={child.path}>
                                  <NavLink 
                                    to={child.path} 
                                    className={({ isActive }) => 
                                      `block p-2 rounded-md text-sm ${isActive 
                                        ? "bg-primary text-primary-foreground" 
                                        : "hover:bg-accent"}`
                                    }
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
                    <div className="p-4 border-t">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                          <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{userData?.name || 'Utilisateur'}</span>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-left" 
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
                          className="w-full justify-start text-left" 
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
                          className="w-full justify-start text-left" 
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-t flex flex-col space-y-2">
                      <Button 
                        onClick={() => {
                          navigate('/auth/login');
                          setIsMenuOpen(false);
                        }}
                      >
                        Se connecter
                      </Button>
                      <Button 
                        variant="outline" 
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
