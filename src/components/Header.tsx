
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
import { LogOut, User, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { clearCart } from '@/services/cart'; 
import { toast } from 'sonner';
import CartIcon from './shop/CartIcon';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from '@/services/firebase';

const Header = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { path: '/produits', label: 'Boutique' },
  ];

  return (
    <header className="bg-background border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Chargeurs Coop Logo" 
            className="h-10 w-auto" 
          />
        </Link>
        
        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
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
          ))}
        </nav>
        
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
                <DropdownMenuItem onClick={handleLogout} >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth/login')}>
                Se connecter
              </Button>
              <Button size="sm" onClick={() => navigate('/auth/register')}>
                S'inscrire
              </Button>
            </>
          )}
          
          {/* Bouton de menu mobile */}
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
                      src="/logo.png" 
                      alt="Chargeurs Coop Logo" 
                      className="h-8 w-auto" 
                    />
                  </Link>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <NavLink 
                          to={item.path} 
                          className={({ isActive }) => 
                            `block p-2 rounded-md ${isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-accent"}`
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
        </div>
      </div>
    </header>
  );
};

export default Header;
