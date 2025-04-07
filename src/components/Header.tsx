
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import UserMenu from './header/UserMenu';
import CartIcon from './shop/CartIcon';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
