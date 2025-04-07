
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Fonction pour ajouter des catégories
const addCategories = async () => {
  const categories = [
    {
      name: 'Powerbanks',
      slug: 'powerbanks',
      description: 'Batteries portables pour recharger vos appareils en déplacement'
    },
    {
      name: 'Bornes de recharge',
      slug: 'bornes-de-recharge',
      description: 'Stations de recharge pour espaces publics et privés'
    },
    {
      name: 'Goodies',
      slug: 'goodies',
      description: 'Produits dérivés et accessoires'
    },
    {
      name: 'Cartes cadeaux',
      slug: 'cartes-cadeaux',
      description: 'Offrez l\'énergie durable à vos proches'
    }
  ];

  for (const category of categories) {
    const { error } = await supabase
      .from('product_categories')
      .upsert(category, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Erreur lors de l'ajout de la catégorie ${category.name}:`, error);
    }
  }
};

// Fonction pour ajouter des produits
const addProducts = async () => {
  // D'abord récupérer les IDs des catégories
  const { data: categories, error: categoryError } = await supabase
    .from('product_categories')
    .select('id, slug');
  
  if (categoryError) {
    console.error('Erreur lors de la récupération des catégories:', categoryError);
    return;
  }

  const getCategoryId = (slug: string) => {
    const category = categories?.find(cat => cat.slug === slug);
    return category?.id;
  };

  const powerbanksCategory = getCategoryId('powerbanks');
  const bornesCategory = getCategoryId('bornes-de-recharge');
  const goodiesCategory = getCategoryId('goodies');
  const cartesCategory = getCategoryId('cartes-cadeaux');

  // Définir les produits
  const products = [
    // Powerbanks
    {
      name: 'PowerBank Eco 10000mAh',
      slug: 'powerbank-eco-10000mah',
      description: 'Batterie externe écologique de 10000 mAh avec 2 ports USB et recharge rapide.',
      short_description: 'Batterie externe écologique et compacte',
      price: 49.90,
      sale_price: 39.90,
      stock_quantity: 100,
      category_id: powerbanksCategory,
      featured: true,
      image_url: 'https://i.imgur.com/f0VkBBn.jpg',
      status: 'published'
    },
    {
      name: 'PowerBank Pro 20000mAh',
      slug: 'powerbank-pro-20000mah',
      description: 'Notre batterie la plus puissante avec une capacité de 20000 mAh, compatible avec tous les appareils et proposant une recharge sans fil.',
      short_description: 'Batterie externe haute capacité avec recharge sans fil',
      price: 79.90,
      stock_quantity: 50,
      category_id: powerbanksCategory,
      featured: true,
      image_url: 'https://i.imgur.com/YoU8OLt.jpg',
      status: 'published'
    },
    {
      name: 'PowerBank Mini 5000mAh',
      slug: 'powerbank-mini-5000mah',
      description: 'Batterie compacte et légère, idéale pour les déplacements quotidiens.',
      short_description: 'Batterie légère pour une charge d\'appoint',
      price: 29.90,
      stock_quantity: 150,
      category_id: powerbanksCategory,
      featured: false,
      image_url: 'https://i.imgur.com/jFIz0xm.jpg',
      status: 'published'
    },

    // Bornes de recharge
    {
      name: 'Station de recharge murale',
      slug: 'station-recharge-murale',
      description: 'Borne murale pour intérieur, idéale pour les commerces et espaces publics. Permet de recharger jusqu\'à 6 appareils simultanément.',
      short_description: 'Borne murale pour espaces publics',
      price: 399.90,
      stock_quantity: 20,
      category_id: bornesCategory,
      featured: true,
      image_url: 'https://i.imgur.com/N9Oubp6.jpg',
      status: 'published'
    },
    {
      name: 'Borne de recharge autonome solaire',
      slug: 'borne-recharge-solaire',
      description: 'Station de recharge autonome alimentée par énergie solaire, parfaite pour les espaces extérieurs.',
      short_description: 'Borne solaire pour extérieur',
      price: 899.90,
      stock_quantity: 10,
      category_id: bornesCategory,
      featured: true,
      image_url: 'https://i.imgur.com/B0KUhZ8.jpg',
      status: 'published'
    },
    {
      name: 'Mini borne de table',
      slug: 'mini-borne-table',
      description: 'Petite borne de recharge pour tables de restaurant ou de café. Élégante et pratique.',
      short_description: 'Borne compacte pour tables',
      price: 149.90,
      stock_quantity: 30,
      category_id: bornesCategory,
      featured: false,
      image_url: 'https://i.imgur.com/sFMbJ4y.jpg',
      status: 'published'
    },

    // Goodies
    {
      name: 'T-shirt Chargeurs',
      slug: 't-shirt-chargeurs',
      description: 'T-shirt 100% coton bio avec notre logo.',
      short_description: 'T-shirt écologique',
      price: 24.90,
      stock_quantity: 100,
      category_id: goodiesCategory,
      featured: false,
      image_url: 'https://i.imgur.com/0ZDpzBw.jpg',
      status: 'published'
    },
    {
      name: 'Gourde isotherme',
      slug: 'gourde-isotherme',
      description: 'Gourde isotherme réutilisable en acier inoxydable, capacité 500ml.',
      short_description: 'Gourde écologique réutilisable',
      price: 29.90,
      stock_quantity: 80,
      category_id: goodiesCategory,
      featured: true,
      image_url: 'https://i.imgur.com/U0L9KVJ.jpg',
      status: 'published'
    },
    {
      name: 'Sac en toile',
      slug: 'sac-toile',
      description: 'Sac en toile 100% coton bio avec impression de notre logo.',
      short_description: 'Sac réutilisable et écologique',
      price: 14.90,
      stock_quantity: 120,
      category_id: goodiesCategory,
      featured: false,
      image_url: 'https://i.imgur.com/N2pf8U1.jpg',
      status: 'published'
    },

    // Cartes cadeaux
    {
      name: 'Carte cadeau 50 CHF',
      slug: 'carte-cadeau-50',
      description: 'Carte cadeau d\'une valeur de 50 CHF, valable sur tous nos produits et services.',
      short_description: 'Offrez 50 CHF à dépenser sur notre site',
      price: 50,
      stock_quantity: 999,
      category_id: cartesCategory,
      featured: false,
      image_url: 'https://i.imgur.com/vBfUkRG.jpg',
      status: 'published'
    },
    {
      name: 'Carte cadeau 100 CHF',
      slug: 'carte-cadeau-100',
      description: 'Carte cadeau d\'une valeur de 100 CHF, valable sur tous nos produits et services.',
      short_description: 'Offrez 100 CHF à dépenser sur notre site',
      price: 100,
      stock_quantity: 999,
      category_id: cartesCategory,
      featured: true,
      image_url: 'https://i.imgur.com/vBfUkRG.jpg',
      status: 'published'
    },
    {
      name: 'Carte cadeau 200 CHF',
      slug: 'carte-cadeau-200',
      description: 'Carte cadeau d\'une valeur de 200 CHF, valable sur tous nos produits et services.',
      short_description: 'Offrez 200 CHF à dépenser sur notre site',
      price: 200,
      stock_quantity: 999,
      category_id: cartesCategory,
      featured: false,
      image_url: 'https://i.imgur.com/vBfUkRG.jpg',
      status: 'published'
    }
  ];

  // Ajouter les produits
  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Erreur lors de l'ajout du produit ${product.name}:`, error);
    }
  }
};

// Ajouter des variantes pour certains produits
const addProductVariants = async () => {
  // Récupérer les IDs des produits
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug');
  
  if (productsError) {
    console.error('Erreur lors de la récupération des produits:', productsError);
    return;
  }

  const getProductId = (slug: string) => {
    const product = products?.find(p => p.slug === slug);
    return product?.id;
  };

  // Variantes pour le T-shirt
  const tshirtVariants = [
    {
      product_id: getProductId('t-shirt-chargeurs'),
      name: 'Taille S',
      price: 24.90,
      stock_quantity: 20,
      attributes: { size: 'S', color: 'Noir' }
    },
    {
      product_id: getProductId('t-shirt-chargeurs'),
      name: 'Taille M',
      price: 24.90,
      stock_quantity: 30,
      attributes: { size: 'M', color: 'Noir' }
    },
    {
      product_id: getProductId('t-shirt-chargeurs'),
      name: 'Taille L',
      price: 24.90,
      stock_quantity: 30,
      attributes: { size: 'L', color: 'Noir' }
    },
    {
      product_id: getProductId('t-shirt-chargeurs'),
      name: 'Taille XL',
      price: 24.90,
      stock_quantity: 20,
      attributes: { size: 'XL', color: 'Noir' }
    }
  ];

  // Variantes pour la gourde
  const gourdeVariants = [
    {
      product_id: getProductId('gourde-isotherme'),
      name: 'Bleu',
      price: 29.90,
      stock_quantity: 30,
      attributes: { color: 'Bleu' },
      image_url: 'https://i.imgur.com/U0L9KVJ.jpg'
    },
    {
      product_id: getProductId('gourde-isotherme'),
      name: 'Rouge',
      price: 29.90,
      stock_quantity: 25,
      attributes: { color: 'Rouge' },
      image_url: 'https://i.imgur.com/OiflTlD.jpg'
    },
    {
      product_id: getProductId('gourde-isotherme'),
      name: 'Noir',
      price: 29.90,
      stock_quantity: 25,
      attributes: { color: 'Noir' },
      image_url: 'https://i.imgur.com/Tn0D2VN.jpg'
    }
  ];

  // Ajouter toutes les variantes
  const variants = [...tshirtVariants, ...gourdeVariants];
  
  for (const variant of variants) {
    if (!variant.product_id) continue;
    
    const { error } = await supabase
      .from('product_variants')
      .insert(variant);
    
    if (error) {
      console.error(`Erreur lors de l'ajout de la variante ${variant.name}:`, error);
    }
  }
};

// Fonction principale pour ajouter tous les produits
export const seedProducts = async () => {
  try {
    await addCategories();
    await addProducts();
    await addProductVariants();
    toast.success("Produits ajoutés avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des produits:", error);
    toast.error("Erreur lors de l'ajout des produits");
    return false;
  }
};
