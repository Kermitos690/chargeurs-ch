
export type NavItem = {
  path: string;
  label: string;
};

export const mainNavItems: NavItem[] = [
  { path: '/', label: 'Accueil' },
  { path: '/features', label: 'Fonctionnalités' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' },
];

export const productNavItems: NavItem[] = [
  { path: '/produits', label: 'Tous les produits' },
  { path: '/produits/accessoires', label: 'Accessoires' },
  { path: '/produits/residentiels', label: 'Résidentiels' },
  { path: '/produits/entreprises', label: 'Entreprises' },
  { path: '/produits/publiques', label: 'Publiques' },
];
