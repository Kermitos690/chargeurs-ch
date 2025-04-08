
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthSection: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <div className="px-6 py-4 border-t">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Compte</h2>
      <div className="space-y-1">
        <DrawerClose asChild>
          <NavLink 
            to="/auth/login" 
            className="flex items-center p-3.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '75ms'
            }}
          >
            <LogIn className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Se connecter
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink 
            to="/auth/register" 
            className="flex items-center p-3.5 rounded-lg text-base font-medium text-green-600 hover:bg-green-50 transition-all duration-300"
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '150ms'
            }}
          >
            <UserPlus className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Créer un compte
          </NavLink>
        </DrawerClose>
      </div>
    </div>
  );
};

export default AuthSection;
