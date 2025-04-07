
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sparkles } from 'lucide-react';
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
                className={`group relative flex items-center px-3 py-2 rounded-md transition-all duration-300 overflow-hidden ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/') 
                  ? "bg-electric-blue text-primary-foreground shadow-electric animate-electric-pulse" 
                  : "hover:bg-electric-blue/10 hover:text-electric-blue"
                }`}
              >
                <div className="relative z-10 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5 transition-all duration-500 group-hover:text-electric-blue" />
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                
                {/* Effet de fond néon sur hover */}
                <div className="absolute inset-0 bg-gradient-electric opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 glass-panel-electric animate-scale-in rounded-lg shadow-elevation-electric"
            >
              <DropdownMenuItem asChild className="electric-glow">
                <NavLink 
                  to={item.path} 
                  className="w-full font-medium hover:bg-electric-blue/10 hover:text-electric-blue transition-colors"
                >
                  <span className="text-gradient-electric">Tous les {item.label.toLowerCase()}</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-electric-blue/20" />
              {item.children.map((child) => (
                <DropdownMenuItem key={child.path} asChild>
                  <NavLink 
                    to={child.path} 
                    className={({ isActive }) => cn(
                      "w-full hover:bg-electric-blue/10 transition-all duration-200",
                      isActive 
                        ? "text-electric-blue font-medium electric-glow" 
                        : "hover:text-electric-blue"
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
              "group relative flex items-center px-3 py-2 rounded-md transition-all duration-300 overflow-hidden",
              isActive 
                ? "bg-electric-blue text-primary-foreground shadow-electric animate-electric-pulse" 
                : "hover:bg-electric-blue/10 hover:text-electric-blue"
            )}
          >
            <div className="relative z-10 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 transition-all duration-500 group-hover:text-electric-blue" />
              {item.label}
            </div>
            
            {/* Effet de fond néon sur hover */}
            <div className="absolute inset-0 bg-gradient-electric opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </NavLink>
        )
      ))}
    </div>
  );
};

export default DesktopNavigation;
