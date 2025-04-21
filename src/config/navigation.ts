
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
      title: "Stations",
      href: "/stations",
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

export const mainNavItems = [
  {
    path: "/",
    label: "Accueil"
  },
  {
    path: "/stations",
    label: "Stations"
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
    path: "/produits",
    label: "Tous les produits"
  },
  {
    path: "/produits/accessoires",
    label: "Accessoires"
  },
  {
    path: "/location/journalier",
    label: "Location journalière"
  },
  {
    path: "/location/hebdomadaire",
    label: "Location hebdomadaire"
  },
  {
    path: "/location/mensuelle",
    label: "Location mensuelle"
  },
  {
    path: "/abonnements",
    label: "Abonnements"
  }
]
