
import { useMemo } from 'react';
import { accessories, Accessory } from '@/data/accessories';

export interface AccessoryCategory {
  id: string;
  name: string;
  slug: string;
}

export const useAccessoryCategories = (searchTerm: string) => {
  // Définir les catégories d'accessoires
  const categories: AccessoryCategory[] = [
    { id: 'charging', name: 'Recharge', slug: 'charging' },
    { id: 'adapters', name: 'Adaptateurs', slug: 'adapters' },
    { id: 'storage', name: 'Rangement', slug: 'storage' },
    { id: 'protection', name: 'Protection', slug: 'protection' },
    { id: 'cards', name: 'Cartes et Badges', slug: 'cards' },
  ];

  // Filtrer les accessoires selon le terme de recherche
  const filteredAccessories = useMemo(() => {
    return accessories.filter(acc => 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      acc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Classer les accessoires par catégorie
  const categorizedAccessories = useMemo(() => {
    return {
      'charging': accessories.filter(acc => 
        acc.name.toLowerCase().includes('câble') || 
        acc.name.toLowerCase().includes('recharge') || 
        acc.name.toLowerCase().includes('borne')
      ),
      'adapters': accessories.filter(acc => 
        acc.name.toLowerCase().includes('adaptateur')
      ),
      'storage': accessories.filter(acc => 
        acc.name.toLowerCase().includes('support') || 
        acc.name.toLowerCase().includes('rangement')
      ),
      'protection': accessories.filter(acc => 
        acc.name.toLowerCase().includes('protection') || 
        acc.name.toLowerCase().includes('intempéries')
      ),
      'cards': accessories.filter(acc => 
        acc.name.toLowerCase().includes('carte') || 
        acc.name.toLowerCase().includes('rfid')
      ),
    };
  }, []);

  // Fonction pour obtenir les accessoires à afficher selon l'onglet sélectionné
  const getAccessoriesToDisplay = (category: string) => {
    if (category === 'all') {
      return filteredAccessories;
    }
    
    return categorizedAccessories[category as keyof typeof categorizedAccessories] 
      ? categorizedAccessories[category as keyof typeof categorizedAccessories].filter(acc => 
          acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          acc.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) 
      : [];
  };
  
  return {
    categories,
    filteredAccessories,
    categorizedAccessories,
    getAccessoriesToDisplay
  };
};
