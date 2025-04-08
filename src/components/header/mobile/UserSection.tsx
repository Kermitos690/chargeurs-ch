
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface UserSectionProps {
  handleLogout: () => void;
}

const UserSection: React.FC<UserSectionProps> = ({ handleLogout }) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Mon compte</h2>
      <div className="space-y-1">
        <DrawerClose asChild>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center p-3.5 rounded-lg text-base font-medium transition-all duration-300 
              ${isActive 
                ? "bg-green-50 text-green-600 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50"}`
            }
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '75ms'
            }}
          >
            <User className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Profil
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink 
            to="/account" 
            className={({ isActive }) => 
              `flex items-center p-3.5 rounded-lg text-base font-medium transition-all duration-300 
              ${isActive 
                ? "bg-green-50 text-green-600 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50"}`
            }
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '150ms'
            }}
          >
            <Settings className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Paramètres
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink 
            to="/faq" 
            className={({ isActive }) => 
              `flex items-center p-3.5 rounded-lg text-base font-medium transition-all duration-300 
              ${isActive 
                ? "bg-green-50 text-green-600 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50"}`
            }
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '225ms'
            }}
          >
            <HelpCircle className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Aide
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <button 
            className="flex items-center p-3.5 rounded-lg text-base font-medium w-full text-left text-red-600 hover:bg-red-50 transition-all duration-300"
            onClick={handleLogout}
            style={{ 
              opacity: 0,
              animation: 'fadeInItem 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '300ms'
            }}
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={2} />
            Se déconnecter
          </button>
        </DrawerClose>
      </div>
    </div>
  );
};

export default UserSection;
