
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerClose } from "@/components/ui/drawer";
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-1">
        {items.map((item) => (
          <DrawerClose key={item.path} asChild>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                `flex items-center p-3.5 rounded-lg text-base ${isActive 
                  ? "bg-green-50 text-green-600 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"}`
              }
            >
              <item.icon className="w-5 h-5 mr-3" strokeWidth={1.8} />
              {item.label}
            </NavLink>
          </DrawerClose>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
