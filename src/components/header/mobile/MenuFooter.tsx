
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";

const MenuFooter: React.FC = () => {
  return (
    <div className="mt-auto px-6 py-4 border-t border-gray-200">
      <p className="text-center text-sm text-gray-500 transition-opacity duration-300"
         style={{ 
           opacity: 0,
           animation: 'fadeInItem 0.5s cubic-bezier(0.26, 0.54, 0.32, 1) forwards',
           animationDelay: '50ms'
         }}>
        © 2025 Chargeurs.ch
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <DrawerClose asChild>
          <NavLink 
            to="/conditions" 
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors duration-300"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.26, 0.54, 0.32, 1) forwards',
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
              animation: 'fadeInItem 0.5s cubic-bezier(0.26, 0.54, 0.32, 1) forwards',
              animationDelay: '200ms'
            }}
          >
            Confidentialité
          </NavLink>
        </DrawerClose>
      </div>
    </div>
  );
};

export default MenuFooter;
