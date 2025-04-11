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
      name: "Boutique",
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
