
import { MainNavItem } from "@/types"

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

// Add these exports that match the imports in Header.tsx
export const mainNavItems = [
  {
    path: "/",
    label: "Accueil"
  },
  {
    path: "/produits",
    label: "Produits"
  },
  {
    path: "/a-propos",
    label: "À propos"
  },
  {
    path: "/contact",
    label: "Contact"
  }
]

export const productNavItems = [
  {
    path: "/produits/residentiels",
    label: "Résidentiels"
  },
  {
    path: "/produits/entreprises",
    label: "Entreprises"
  },
  {
    path: "/produits/publiques",
    label: "Publiques"
  },
  {
    path: "/boutique",
    label: "Boutique"
  },
  {
    path: "/produits/accessoires",
    label: "Accessoires"
  }
]
