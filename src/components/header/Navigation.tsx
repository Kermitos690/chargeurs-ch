
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  navItems: { path: string; label: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <NavLink 
          key={item.path}
          to={item.path} 
          className={({ isActive }) => 
            `px-3 py-2 rounded-md ${isActive 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
