
export type Accessory = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  specs: string[];
};

export const accessories: Accessory[] = [
  {
    id: 1,
    name: "Câble de recharge Type 2",
    description: "Câble de recharge renforcé compatible avec toutes les bornes Type 2, idéal pour un usage quotidien.",
    price: "290 CHF",
    image: "https://images.unsplash.com/photo-1620752421345-baae8d9336f6?w=800&auto=format&fit=crop&q=60",
    specs: [
      "Longueur: 5 mètres",
      "Ampérage: 32A",
      "Gaine haute résistance",
      "Compatible toutes saisons",
      "Garantie 24 mois"
    ]
  },
  {
    id: 2,
    name: "Support mural pour câble",
    description: "Support design et fonctionnel pour ranger votre câble de recharge proprement et en toute sécurité.",
    price: "79 CHF",
    image: "https://images.unsplash.com/photo-1633174524827-db00a6b9c7b1?w=800&auto=format&fit=crop&q=60",
    specs: [
      "Acier inoxydable",
      "Installation facile",
      "Compatible avec tous types de câbles",
      "Design élégant",
      "Résistant aux intempéries"
    ]
  },
  {
    id: 3,
    name: "Adaptateur CHAdeMO vers CCS",
    description: "Adaptateur permettant de connecter un véhicule équipé d'une prise CCS à une borne CHAdeMO.",
    price: "450 CHF",
    image: "https://images.unsplash.com/photo-1631083731032-f3cdde056225?w=800&auto=format&fit=crop&q=60",
    specs: [
      "Puissance max: 50kW",
      "Sécurité intégrée",
      "Compact et léger",
      "Certifié CE",
      "Garantie 24 mois"
    ]
  },
  {
    id: 4,
    name: "Carte RFID multi-réseaux",
    description: "Carte RFID permettant d'accéder à plus de 95% des bornes de recharge publiques en Suisse et en Europe.",
    price: "25 CHF",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60",
    specs: [
      "Compatible avec +150'000 bornes",
      "Technologie NFC",
      "Sans abonnement",
      "Application de gestion",
      "Service client 24/7"
    ]
  },
  {
    id: 5,
    name: "Borne de recharge portable",
    description: "Solution de recharge portable pour les situations d'urgence ou les déplacements occasionnels.",
    price: "390 CHF",
    image: "https://images.unsplash.com/photo-1618030941059-d3c17c2f20a4?w=800&auto=format&fit=crop&q=60",
    specs: [
      "Puissance: 3.7 kW",
      "Compatible prise domestique",
      "Mallette de transport",
      "Protection intégrée",
      "Garantie 24 mois"
    ]
  },
  {
    id: 6,
    name: "Kit de protection intempéries",
    description: "Protégez votre connexion de recharge contre les intempéries pour une utilisation en extérieur en toute sécurité.",
    price: "95 CHF",
    image: "https://images.unsplash.com/photo-1594818020972-e96e69a05f28?w=800&auto=format&fit=crop&q=60",
    specs: [
      "100% étanche (IP67)",
      "Compatible Type 1 et Type 2",
      "Matériaux durables",
      "Système de verrouillage",
      "Résistant aux UV"
    ]
  }
];
