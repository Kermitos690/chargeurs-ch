
import { MainNavItem, NavItem } from "@/types"

interface DocsConfig {
  mainNav: MainNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Accueil",
      href: "/",
    },
    {
      title: "Produits",
      href: "/produits",
    },
    {
      title: "Boutique",
      href: "/boutique",
    },
    {
      title: "Accessoires",
      href: "/accessoires",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "À propos",
      href: "/a-propos",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
}

// Export the main navigation items from the config
export const mainNavItems: NavItem[] = docsConfig.mainNav.map(item => ({
  title: item.title,
  href: item.href,
  name: item.name,
}));

// Export product navigation items
export const productNavItems: NavItem[] = [
  {
    title: "Tous les produits",
    href: "/boutique",
  },
  {
    title: "Bornes résidentielles",
    href: "/produits/residentiels",
  },
  {
    title: "Solutions entreprises",
    href: "/produits/entreprises",
  },
  {
    title: "Infrastructures publiques",
    href: "/produits/publiques",
  },
  {
    title: "Accessoires",
    href: "/produits/accessoires",
  }
];
