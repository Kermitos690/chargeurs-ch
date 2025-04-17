import React from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import MenuSection from './mobile/MenuSection';
import UserSection from './mobile/UserSection';
import AuthSection from './mobile/AuthSection';
import MenuFooter from './mobile/MenuFooter';
import { getMainNavItems, getProductNavItems } from './mobile/NavItems';
import { NavItem } from '@/types';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  navItems: NavItem[];
  productItems: NavItem[];
  user: any;
  handleLogout: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  navItems, 
  productItems,
  user,
  handleLogout
}) => {
  // Get navigation items with icons
  const mainNavItems = getMainNavItems();
  const shopNavItems = getProductNavItems(productItems);

  return (
    <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DrawerTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="transition-all duration-300">
          {isMenuOpen ? 
            <X className="h-5 w-5 transition-all duration-300 animate-in fade-in-50" /> : 
            <Menu className="h-5 w-5 transition-all duration-300 animate-in fade-in-50" />
          }
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 h-[90vh] rounded-t-xl transition-all duration-300 border-t-2 border-green-600">
        <div className="h-1.5 w-12 rounded-full bg-gray-300 mx-auto my-2 animate-in fade-in zoom-in-95 duration-300" />
        
        <div className="overflow-y-auto h-full pb-safe custom-scrollbar">
          {/* Main Navigation */}
          <div className="animate-in slide-in-from-top duration-300 delay-75">
            <MenuSection title="Navigation" items={mainNavItems} />
          </div>
          
          <div className="h-px bg-gray-200 mx-6 my-2" />
          
          {/* Boutique Section */}
          <div className="animate-in slide-in-from-top duration-300 delay-150">
            <MenuSection title="Boutique" items={shopNavItems} />
          </div>
          
          {user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* User Account Section */}
              <div className="animate-in slide-in-from-top duration-300 delay-225">
                <UserSection handleLogout={handleLogout} />
              </div>
            </>
          )}
          
          {!user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* Authentication Section */}
              <div className="animate-in slide-in-from-top duration-300 delay-225">
                <AuthSection />
              </div>
            </>
          )}
          
          {/* Footer */}
          <div className="animate-in fade-in duration-300 delay-300">
            <MenuFooter />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
