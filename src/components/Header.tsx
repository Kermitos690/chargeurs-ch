
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import UserMenu from './header/UserMenu';
import CartIcon from './shop/CartIcon';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        toast.error("Erreur lors de la déconnexion");
        return;
      }
      
      toast.success("Déconnexion réussie");
      navigate('/');
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

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
        
        {/* Desktop Navigation */}
        <DesktopNavigation />
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          {/* User Menu (Desktop) */}
          <UserMenu />
          
          {/* Mobile Navigation */}
          <MobileNavigation 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
