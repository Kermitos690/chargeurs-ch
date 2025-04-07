
import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { navigationItems } from './navigation-items';
import { cn } from '@/lib/utils';

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center space-x-2">
      {navigationItems.map((item) => (
        item.children.length > 0 ? (
          <DropdownMenu key={item.path}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`group relative flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/') 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <div className="relative z-10 flex items-center">
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-white rounded-lg shadow-lg border border-gray-200"
              align="center"
              sideOffset={8}
            >
              <DropdownMenuItem asChild className="font-medium">
                <NavLink 
                  to={item.path} 
                  className="w-full hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span className="text-primary">Tous les {item.label.toLowerCase()}</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              {item.children.map((child) => (
                <DropdownMenuItem key={child.path} asChild>
                  <NavLink 
                    to={child.path} 
                    className={({ isActive }) => cn(
                      "w-full py-2 hover:bg-primary/5 transition-all duration-200",
                      isActive 
                        ? "text-primary font-medium" 
                        : "hover:text-primary"
                    )}
                  >
                    {child.label}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => cn(
              "relative flex items-center px-3 py-2 rounded-md transition-all duration-300",
              isActive 
                ? "text-primary font-medium bg-primary/10" 
                : "hover:bg-primary/5 hover:text-primary"
            )}
          >
            <div className="relative z-10 flex items-center">
              {item.label}
            </div>
          </NavLink>
        )
      ))}
    </div>
  );
};

export default DesktopNavigation;
