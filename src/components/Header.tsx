
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Produits', path: '/produits' },
    { label: 'Stations', path: '/stations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          chargeurs.ch
        </Link>
        
        {/* Desktop Navigation */}
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
          <Button asChild>
            <Link to="/auth/login">
              Connexion
            </Link>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
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
          <Button asChild className="mt-4">
            <Link to="/auth/login">
              Connexion
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
