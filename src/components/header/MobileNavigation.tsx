
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
        <Button variant="ghost" size="icon" className="transition-all duration-300">
          {isMenuOpen ? 
            <X className="h-5 w-5 transition-all duration-300 animate-in fade-in-50" /> : 
            <Menu className="h-5 w-5 transition-all duration-300 animate-in fade-in-50" />
          }
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 h-[85vh] rounded-t-xl transition-all duration-300">
        <DrawerOverlay className="bg-black/60 backdrop-blur-sm animate-in fade-in-75 duration-300" />
        
        <div className="h-2 w-12 rounded-full bg-gray-300 mx-auto mb-2 mt-2 animate-in fade-in zoom-in-95 duration-300" />
        
        <div className="overflow-y-auto h-full pb-safe">
          {/* Main Navigation */}
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-75">
            <MenuSection title="Navigation" items={mainNavItems} />
          </div>
          
          <div className="h-px bg-gray-200 mx-6 my-2 animate-in fade-in duration-700 delay-150" />
          
          {/* Boutique Section */}
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200">
            <MenuSection title="Boutique" items={shopNavItems} />
          </div>
          
          {user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2 animate-in fade-in duration-700 delay-300" />
              
              {/* User Account Section */}
              <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-350">
                <UserSection handleLogout={handleLogout} />
              </div>
            </>
          )}
          
          {!user && (
            <>
              <div className="h-px bg-gray-200 mx-6 my-2 animate-in fade-in duration-700 delay-300" />
              
              {/* Authentication Section */}
              <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-350">
                <AuthSection />
              </div>
            </>
          )}
          
          {/* Footer */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-450">
            <MenuFooter />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;
