
type NavigationItem = {
  path: string;
  label: string;
  children: {
    path: string;
    label: string;
  }[];
};

export const navigationItems: NavigationItem[] = [
  {
    path: "/produits",
    label: "Produits",
    children: [
      {
        path: "/produits/powerbanks",
        label: "Powerbanks"
      },
      {
        path: "/produits/accessoires",
        label: "Accessoires"
      },
      {
        path: "/produits/particuliers",
        label: "Pour particuliers"
      },
      {
        path: "/produits/entreprises",
        label: "Pour entreprises"
      }
    ]
  },
  {
    path: "/stations",
    label: "Stations",
    children: []
  },
  {
    path: "/abonnements",
    label: "Abonnements",
    children: []
  },
  {
    path: "/a-propos",
    label: "À propos",
    children: [
      {
        path: "/a-propos/entreprise",
        label: "Notre entreprise"
      },
      {
        path: "/a-propos/histoire",
        label: "Notre histoire"
      },
      {
        path: "/a-propos/equipe",
        label: "Notre équipe"
      }
    ]
  },
  {
    path: "/contact",
    label: "Contact",
    children: []
  }
];
