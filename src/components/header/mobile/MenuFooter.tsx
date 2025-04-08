
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";
import { useAuth } from '@/hooks/useAuth';

const MenuFooter: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mt-auto px-6 py-4 border-t border-gray-200 bg-gray-50">
      <p className="text-center text-sm text-gray-500">
        © 2025 Chargeurs.ch
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <DrawerClose asChild>
          <NavLink 
            to="/conditions" 
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors duration-300"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '125ms'
            }}
          >
            Conditions
          </NavLink>
        </DrawerClose>
        <DrawerClose asChild>
          <NavLink 
            to="/confidentialite" 
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors duration-300"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '200ms'
            }}
          >
            Confidentialité
          </NavLink>
        </DrawerClose>
        
        {user && (
          <DrawerClose asChild>
            <NavLink 
              to="/cookies" 
              className="text-xs text-gray-500 hover:text-gray-800 transition-colors duration-300"
              style={{ 
                opacity: 0,
                animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '275ms'
              }}
            >
              Cookies
            </NavLink>
          </DrawerClose>
        )}
      </div>
    </div>
  );
};

export default MenuFooter;
