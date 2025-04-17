
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
      title: "Powerbanks",
      href: "/powerbanks",
    },
    {
      title: "Location",
      href: "/location",
    },
    {
      title: "Stations",
      href: "/stations",
    },
    {
      title: "Abonnements",
      href: "/subscriptions",
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
    path: "/powerbanks",
    label: "Powerbanks"
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
    path: "/stations",
    label: "Stations"
  },
  {
    path: "/abonnements",
    label: "Abonnements"
  }
]
