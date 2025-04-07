
export type NavigationItem = {
  path: string;
  label: string;
  children: { path: string; label: string }[];
};

export const navigationItems: NavigationItem[] = [
  { path: '/', label: 'Accueil', children: [] },
  { 
    path: '/features', 
    label: 'Fonctionnalités', 
    children: [
      { path: '/features/charging', label: 'Recharge rapide' },
      { path: '/features/connectivity', label: 'Connectivité' },
      { path: '/features/security', label: 'Sécurité' }
    ] 
  },
  { 
    path: '/about', 
    label: 'À propos', 
    children: [
      { path: '/about/company', label: 'Notre entreprise' },
      { path: '/about/team', label: 'Équipe' },
      { path: '/about/history', label: 'Histoire' }
    ] 
  },
  { 
    path: '/contact', 
    label: 'Contact',
    children: [] 
  },
  { 
    path: '/produits', 
    label: 'Boutique',
    children: [
      { path: '/produits/accessoires', label: 'Accessoires' },
      { path: '/produits/residentiels', label: 'Chargeurs résidentiels' },
      { path: '/produits/entreprises', label: 'Solutions entreprises' },
      { path: '/produits/publiques', label: 'Bornes publiques' }
    ] 
  },
];
