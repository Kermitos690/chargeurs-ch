
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";

const AuthSection: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Connexion</h2>
      <div className="space-y-3">
        <DrawerClose asChild>
          <NavLink 
            to="/auth/login" 
            className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.3s ease forwards',
              animationDelay: '100ms'
            }}
          >
            Se connecter
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink 
            to="/auth/register" 
            className="flex items-center justify-center p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.3s ease forwards',
              animationDelay: '150ms'
            }}
          >
            S'inscrire
          </NavLink>
        </DrawerClose>
      </div>
    </div>
  );
};

export default AuthSection;
