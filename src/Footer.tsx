
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border/60 py-6 md:py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
          <div className="md:w-1/3">
            <div className="mb-3">
              <h3 className="text-lg font-semibold">chargeurs.ch</h3>
            </div>
            <p className="text-muted-foreground mb-3 text-sm">
              Votre partenaire de confiance pour la location de powerbanks dans les bars et restaurants en Suisse Romande.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Icons */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Solutions</h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link to="/produits/residentiels" className="text-muted-foreground hover:text-primary transition-colors">Bornes résidentielles</Link>
                  </li>
                  <li>
                    <Link to="/produits/entreprises" className="text-muted-foreground hover:text-primary transition-colors">Solutions entreprises</Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Liens utiles</h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">À propos</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/60 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <div>
            &copy; {currentYear} chargeurs.ch. Tous droits réservés.
          </div>
          <div className="mt-2 md:mt-0 flex flex-wrap gap-4 justify-center">
            <Link to="/conditions" className="hover:text-primary transition-colors">Conditions</Link>
            <Link to="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
