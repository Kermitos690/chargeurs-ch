
import { Home, Info, Phone, ShoppingCart } from 'lucide-react';
import { type NavItem } from '@/config/navigation';

export const getMainNavItems = () => {
  return [
    {
      path: '/',
      label: 'Accueil',
      icon: Home
    },
    {
      path: '/features',
      label: 'Fonctionnalités',
      icon: Info
    },
    {
      path: '/about',
      label: 'À propos',
      icon: Info
    },
    {
      path: '/contact',
      label: 'Contact',
      icon: Phone
    }
  ];
};

export const getProductNavItems = (productItems: NavItem[]) => {
  return productItems.map(item => ({
    ...item,
    icon: ShoppingCart
  }));
};
