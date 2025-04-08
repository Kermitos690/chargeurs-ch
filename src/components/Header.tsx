
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { clearCart } from '@/services/cart'; 
import { toast } from 'sonner';
import { auth } from '@/services/firebase';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import CartIcon from './shop/CartIcon';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import UserMenu from './header/UserMenu';
import { mainNavItems, productNavItems } from '@/config/navigation';

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
        
        {/* Desktop Navigation */}
        <DesktopNavigation 
          navItems={mainNavItems}
          productItems={productNavItems}
        />
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          {/* User Menu (Desktop) */}
          <UserMenu 
            user={user}
            userData={userData}
            handleLogout={handleLogout}
          />
          
          {/* Mobile Navigation */}
          <MobileNavigation 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navItems={mainNavItems}
            productItems={productNavItems}
            user={user}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
