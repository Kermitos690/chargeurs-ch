
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
          <NavLink to="/profile" className={({ isActive }) => 
            `flex items-center p-3.5 rounded-lg text-base ${isActive 
              ? "bg-green-50 text-green-600 font-medium" 
              : "text-gray-700 hover:bg-gray-50"}`
          }>
            <User className="w-5 h-5 mr-3" strokeWidth={1.8} />
            Profil
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink to="/account" className={({ isActive }) => 
            `flex items-center p-3.5 rounded-lg text-base ${isActive 
              ? "bg-green-50 text-green-600 font-medium" 
              : "text-gray-700 hover:bg-gray-50"}`
          }>
            <Settings className="w-5 h-5 mr-3" strokeWidth={1.8} />
            Paramètres
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <NavLink to="/faq" className={({ isActive }) => 
            `flex items-center p-3.5 rounded-lg text-base ${isActive 
              ? "bg-green-50 text-green-600 font-medium" 
              : "text-gray-700 hover:bg-gray-50"}`
          }>
            <HelpCircle className="w-5 h-5 mr-3" strokeWidth={1.8} />
            Aide
          </NavLink>
        </DrawerClose>
        
        <DrawerClose asChild>
          <button 
            className="flex items-center p-3.5 rounded-lg text-base w-full text-left text-gray-700 hover:bg-gray-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" strokeWidth={1.8} />
            Se déconnecter
          </button>
        </DrawerClose>
      </div>
    </div>
  );
};

export default UserSection;
