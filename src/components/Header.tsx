
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import CartIcon from '@/components/shop/CartIcon';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const menuItems = [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Produits', path: '/produits' },
    { label: 'Stations', path: '/stations' },
    { label: 'Chat', path: '/chat' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-black">
            chargeurs.ch
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="text-black hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {loading ? (
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" className="text-black border-black hover:bg-gray-100 hover:text-black">
                  <Link to="/account">
                    <User className="mr-2 h-4 w-4" />
                    Mon compte
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="text-black hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" className="text-black border-black hover:bg-gray-100 hover:text-black">
                <Link to="/auth/login">
                  Connexion
                </Link>
              </Button>
            )}
          </nav>
          
          <div className="flex items-center space-x-2">
            <CartIcon />
            
            <button 
              className="md:hidden text-black"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ${
          isMenuOpen ? 'max-h-[70vh] overflow-y-auto' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="text-black hover:text-primary py-2 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          {loading ? (
            <div className="h-10 w-full bg-gray-200 animate-pulse rounded mt-4" />
          ) : user ? (
            <>
              <Button asChild variant="outline" className="mt-4 text-black border-black hover:bg-gray-100 hover:text-black">
                <Link to="/account">
                  <User className="mr-2 h-4 w-4" />
                  Mon compte
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="text-black hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="mt-4 text-black border-black hover:bg-gray-100 hover:text-black">
              <Link to="/auth/login">
                Connexion
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
