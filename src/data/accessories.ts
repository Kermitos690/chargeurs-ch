
export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  specs: string[];
  stripeProductId?: string;
}

export const accessories: Accessory[] = [
  {
    id: 'acc1',
    name: 'Adaptateur Type 2',
    description: 'Adaptateur de charge universel compatible avec la plupart des véhicules électriques',
    price: '149 CHF',
    image: '/lovable-uploads/478a170b-6b38-4e9e-acf6-4aee7c34d07b.png',
    specs: [
      'Compatible avec tous les véhicules Type 2',
      'Puissance jusqu\'à 22 kW',
      'Indice de protection IP67',
      'Câble haute qualité de 50 cm'
    ],
    stripeProductId: 'prod_adaptateur_type2'
  },
  {
    id: 'acc2',
    name: 'Câble de recharge renforcé',
    description: 'Câble de recharge premium pour une utilisation intensive et durable',
    price: '199 CHF',
    image: '/lovable-uploads/a18995fa-57e7-4901-b5bd-708fd76ad058.png',
    specs: [
      'Longueur de 5 mètres',
      'Résistant aux températures extrêmes',
      'Certification TÜV',
      'Garantie 3 ans'
    ],
    stripeProductId: 'prod_cable_renforce'
  },
  {
    id: 'acc3',
    name: 'Extension de garantie',
    description: 'Prolongez la garantie de vos accessoires jusqu\'à 5 ans pour une tranquillité totale',
    price: 'À partir de 199 CHF',
    image: '/lovable-uploads/d57ec078-da32-4674-b9e7-64490acf74b3.png',
    specs: [
      'Extension à 5 ans',
      'Couverture complète pièces et main d\'œuvre',
      'Remplacement express',
      'Support prioritaire'
    ],
    stripeProductId: 'prod_extension_garantie'
  },
  {
    id: 'acc4',
    name: 'Carte RFID multi-réseaux',
    description: 'Carte RFID permettant d\'accéder à plus de 95% des bornes de recharge publiques en Suisse et en Europe',
    price: '25 CHF',
    image: '/lovable-uploads/e91a302c-6f8e-4a87-93ff-3fff9ee39ef0.png',
    specs: [
      'Compatible avec +150\'000 bornes',
      'Technologie NFC',
      'Sans abonnement',
      'Application de gestion',
      'Service client 24/7'
    ],
    stripeProductId: 'prod_carte_rfid'
  }
];
