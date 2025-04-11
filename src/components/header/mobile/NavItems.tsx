
import { Home, Info, Phone, ShoppingCart } from 'lucide-react';
import { NavItem } from '@/types';

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
    path: item.href,
    label: item.title,
    icon: ShoppingCart
  }));
};
