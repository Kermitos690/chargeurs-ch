
import { Station } from '@/types/api';

// Bars et restaurants branchés fictifs de Lausanne avec des bornes de powerbanks
export const mockStations: Station[] = [
  {
    id: '1',
    name: 'Le Sidewalk Café',
    location: 'Rue de Bourg 20, Lausanne',
    latitude: 46.51991,
    longitude: 6.63299,
    availablePowerBanks: 8,
    totalSlots: 10,
    status: 'online',
    description: 'Café branché avec terrasse ensoleillée au centre-ville',
    imageUrl: '/stations/sidewalk.jpg'
  },
  {
    id: '2',
    name: 'The Great Escape',
    location: 'Rue Madeleine 18, Lausanne',
    latitude: 46.52221,
    longitude: 6.63359,
    availablePowerBanks: 4,
    totalSlots: 8,
    status: 'online',
    description: 'Pub avec ambiance internationale et large choix de bières',
    imageUrl: '/stations/great-escape.jpg'
  },
  {
    id: '3',
    name: 'Bleu Lézard',
    location: 'Rue Enning 10, Lausanne',
    latitude: 46.52301,
    longitude: 6.63547,
    availablePowerBanks: 2,
    totalSlots: 6,
    status: 'online',
    description: 'Bar et restaurant avec terrasse et espace culturel en sous-sol',
    imageUrl: '/stations/bleu-lezard.jpg'
  },
  {
    id: '4',
    name: 'Café du Grütli',
    location: 'Rue Mercerie 4, Lausanne',
    latitude: 46.52248,
    longitude: 6.63492,
    availablePowerBanks: 0,
    totalSlots: 6,
    status: 'maintenance',
    description: 'Café traditionnel suisse avec spécialités locales',
    imageUrl: '/stations/grutli.jpg'
  },
  {
    id: '5',
    name: 'Le Bourg',
    location: 'Rue de Bourg 51, Lausanne',
    latitude: 46.52110,
    longitude: 6.63430,
    availablePowerBanks: 5,
    totalSlots: 8,
    status: 'online',
    description: 'Salle de concert et bar alternatif avec scène émergente',
    imageUrl: '/stations/le-bourg.jpg'
  },
  {
    id: '6',
    name: 'Café de l\'Évêché',
    location: 'Place de l\'Évêché 5, Lausanne',
    latitude: 46.52303,
    longitude: 6.63615,
    availablePowerBanks: 0,
    totalSlots: 4,
    status: 'offline',
    description: 'Café au coeur de la vieille ville avec vue pittoresque',
    imageUrl: '/stations/eveche.jpg'
  },
  {
    id: '7',
    name: 'Le Château',
    location: 'Place du Château 7, Lausanne',
    latitude: 46.52352,
    longitude: 6.63528,
    availablePowerBanks: 3,
    totalSlots: 6,
    status: 'online',
    description: 'Bar à vin avec vue panoramique sur le lac Léman',
    imageUrl: '/stations/chateau.jpg'
  },
  {
    id: '8',
    name: 'Ta Cave',
    location: 'Rue Centrale 5, Lausanne',
    latitude: 46.52128,
    longitude: 6.63225,
    availablePowerBanks: 6,
    totalSlots: 10,
    status: 'online',
    description: 'Bar à vins naturels et tapas dans une ambiance conviviale',
    imageUrl: '/stations/ta-cave.jpg'
  },
  {
    id: '9',
    name: 'Le Gram',
    location: 'Avenue de France 15, Lausanne',
    latitude: 46.52420,
    longitude: 6.62991,
    availablePowerBanks: 7,
    totalSlots: 8,
    status: 'online',
    description: 'Restaurant moderne avec cuisine d\'inspiration mondiale',
    imageUrl: '/stations/le-gram.jpg'
  },
  {
    id: '10',
    name: 'Café Romand',
    location: 'Place Saint-François 2, Lausanne',
    latitude: 46.52037, 
    longitude: 6.63246,
    availablePowerBanks: 4,
    totalSlots: 6,
    status: 'online',
    description: 'Institution lausannoise servant des spécialités suisses',
    imageUrl: '/stations/cafe-romand.jpg'
  },
  {
    id: '11',
    name: 'L\'Éléphant Blanc',
    location: 'Rue du Simplon 17, Lausanne',
    latitude: 46.52508,
    longitude: 6.62782,
    availablePowerBanks: 3,
    totalSlots: 6,
    status: 'online',
    description: 'Bar à cocktails avec ambiance feutrée et terrasse',
    imageUrl: '/stations/elephant-blanc.jpg'
  },
  {
    id: '12',
    name: 'La Couronne d\'Or',
    location: 'Rue des Deux-Marchés 13, Lausanne',
    latitude: 46.52217,
    longitude: 6.63467,
    availablePowerBanks: 5,
    totalSlots: 8,
    status: 'online',
    description: 'Bistrot de quartier avec cuisine de saison et ambiance cosy',
    imageUrl: '/stations/couronne-or.jpg'
  }
];
