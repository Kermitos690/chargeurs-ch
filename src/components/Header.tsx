
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, User, MapPin, Battery, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/services/firebase';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Vous êtes déconnecté");
      navigate('/');
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      toast.error("Une erreur est survenue lors de la déconnexion");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center z-50">
          <Battery className="mr-2 h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">chargeurs.ch</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/features" 
            className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
          >
            Fonctionnalités
          </Link>
          <Link 
            to="/stations" 
            className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors flex items-center"
          >
            <MapPin className="w-4 h-4 mr-1" />
            Nos bornes
          </Link>
          <Link 
            to="/subscriptions" 
            className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
          >
            Abonnements
          </Link>
          <Link 
            to="/about" 
            className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/account">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white rounded-full"
                      size="sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Mon Compte
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Link to="/auth/login">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full"
                    size="sm"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
        <nav className="flex flex-col items-center space-y-6">
          <Link 
            to="/features" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fonctionnalités
          </Link>
          <Link 
            to="/stations" 
            className="text-lg font-medium flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MapPin className="w-5 h-5 mr-1.5" />
            Nos bornes
          </Link>
          <Link 
            to="/subscriptions" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Abonnements
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
          {!loading && (
            <>
              {user ? (
                <>
                  <Link 
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white rounded-full w-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Mon Compte
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline" 
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link 
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
