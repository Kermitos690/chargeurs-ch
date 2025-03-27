
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">chargeurs.ch</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/features" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Caractéristiques
          </Link>
          <Link to="/about" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            À propos
          </Link>
          <Link to="/contact" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Contact
          </Link>
          {isLoggedIn ? (
            <Link to="/account">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white rounded-full"
                size="sm"
              >
                <User className="w-4 h-4 mr-2" />
                Mon Compte
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white rounded-full"
                size="sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out pt-24 px-6",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          <Link 
            to="/features" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Caractéristiques
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <Link 
              to="/account"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button 
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-full mt-4"
              >
                <User className="w-4 h-4 mr-2" />
                Mon Compte
              </Button>
            </Link>
          ) : (
            <div className="w-full space-y-4">
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full w-full"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant="outline" 
                  className="w-full rounded-full"
                >
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
