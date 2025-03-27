
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">chargeurs.ch</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#features" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Caractéristiques
          </a>
          <a href="#about" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            À propos
          </a>
          <a href="#contact" className="link-underline text-sm font-medium text-foreground/90 hover:text-foreground transition-colors">
            Contact
          </a>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full"
            size="sm"
          >
            Commencer
          </Button>
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
          <a 
            href="#features" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Caractéristiques
          </a>
          <a 
            href="#about" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full w-full mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Commencer
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
