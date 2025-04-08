
import React from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import MenuSection from './mobile/MenuSection';
import UserSection from './mobile/UserSection';
import AuthSection from './mobile/AuthSection';
import MenuFooter from './mobile/MenuFooter';
import { getMainNavItems, getProductNavItems } from './mobile/NavItems';
import { type NavItem } from '@/config/navigation';

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
        <Button variant="ghost" size="icon">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 h-[85vh] rounded-t-xl">
        <DrawerOverlay className="bg-black/60" />
        
        <div className="h-2 w-12 rounded-full bg-gray-300 mx-auto mb-2 mt-2" />
        
        <div className="overflow-y-auto h-full pb-safe">
          {/* Main Navigation */}
          <MenuSection title="Navigation" items={mainNavItems} />
          
          <div className="h-px bg-gray-200 mx-6 my-2" />
          
          {/* Boutique Section */}
          <MenuSection title="Boutique" items={shopNavItems} />
          
          {user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* User Account Section */}
              <UserSection handleLogout={handleLogout} />
            </>
          )}
          
          {!user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2" />
              
              {/* Authentication Section */}
              <AuthSection />
            </>
          )}
          
          {/* Footer */}
          <MenuFooter />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
