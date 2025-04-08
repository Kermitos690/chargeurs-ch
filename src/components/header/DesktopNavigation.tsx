
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuContent, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

type NavItem = {
  path: string;
  label: string;
};

interface DesktopNavigationProps {
  navItems: NavItem[];
  productItems: NavItem[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ navItems, productItems }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <NavLink to={item.path}>
                  {item.label}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Boutique</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {productItems.map((item) => (
                  <li key={item.path}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActive ? "bg-accent/50" : ""
                          )
                        }
                      >
                        <div className="text-sm font-medium leading-none">{item.label}</div>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
