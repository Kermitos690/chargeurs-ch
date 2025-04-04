
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { clearCart } from '@/services/cart'; 
import { auth } from '@/services/firebase';
import { useIsMobile } from '@/hooks/use-mobile';
import CartIcon from './shop/CartIcon';
import Navigation from './header/Navigation';
import UserMenu from './header/UserMenu';
import MobileMenu from './header/MobileMenu';
import TabletMenu from './header/TabletMenu';

const Header = () => {
  const { user } = useAuth();
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
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0a73b143-1ad3-4e4d-b62c-9d50ef4d3e33.png" 
            alt="Chargeurs.ch Logo" 
            className="h-12 w-auto" 
          />
        </Link>
        
        <Navigation navItems={navItems} />
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          <UserMenu handleLogout={handleLogout} />
          
          {/* Menu mobile ou tablette selon la détection */}
          {isMobile ? (
            <MobileMenu navItems={navItems} handleLogout={handleLogout} />
          ) : (
            <TabletMenu navItems={navItems} handleLogout={handleLogout} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
