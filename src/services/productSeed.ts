
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Seed products for the shop
export const seedProducts = async () => {
  try {
    console.log("Démarrage de l'importation des produits...");
    
    // First, ensure categories exist
    const categories = [
      { id: 'powerbanks', name: 'Powerbanks', slug: 'powerbanks', description: 'Batteries portables de recharge' },
      { id: 'stations', name: 'Bornes de recharge', slug: 'stations', description: 'Stations de recharge pour véhicules électriques' },
      { id: 'goodies', name: 'Goodies', slug: 'goodies', description: 'Produits dérivés et accessoires' },
      { id: 'gift-cards', name: 'Cartes cadeaux', slug: 'gift-cards', description: 'Cartes cadeaux pour offrir des recharges' }
    ];
    
    // Insert categories
    for (const category of categories) {
      const { error } = await supabase
        .from('product_categories')
        .upsert(category, { onConflict: 'id' });
      
      if (error) {
        console.error(`Erreur lors de l'ajout de la catégorie ${category.name}:`, error);
        toast.error(`Erreur: ${error.message}`);
        return false;
      }
    }
    
    // Now add some products
    const products = [
      // Powerbanks
      {
        id: 'pb-slim-10000',
        name: 'PowerSlim 10000',
        slug: 'powerslim-10000',
        description: 'Batterie externe ultra-fine de 10000mAh avec charge rapide USB-C PD 18W.',
        price: 49.90,
        sale_price: 39.90,
        category_id: 'powerbanks',
        stock_quantity: 150,
        featured: true,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c',
        specifications: JSON.stringify({
          capacity: '10000mAh',
          ports: '1x USB-C, 1x USB-A',
          maxOutput: '18W',
          weight: '180g',
          dimensions: '140 x 70 x 12mm'
        })
      },
      {
        id: 'pb-pro-20000',
        name: 'PowerPro 20000',
        slug: 'powerpro-20000',
        description: 'Batterie externe haute capacité de 20000mAh avec charge ultra-rapide 45W et affichage LED.',
        price: 89.90,
        category_id: 'powerbanks',
        stock_quantity: 75,
        featured: true,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
        specifications: JSON.stringify({
          capacity: '20000mAh',
          ports: '1x USB-C, 2x USB-A',
          maxOutput: '45W',
          weight: '350g',
          dimensions: '160 x 80 x 22mm'
        })
      },
      // Charging Stations
      {
        id: 'cs-home-basic',
        name: 'Station Domicile Basic',
        slug: 'station-domicile-basic',
        description: 'Borne de recharge domestique 7kW avec câble intégré Type 2, idéale pour une installation résidentielle.',
        price: 899,
        category_id: 'stations',
        stock_quantity: 35,
        featured: true,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1618390408023-9e696f0f4b0e',
        specifications: JSON.stringify({
          power: '7kW',
          connector: 'Type 2',
          installation: 'Murale',
          connectivity: 'Wi-Fi',
          dimensions: '450 x 250 x 140mm'
        })
      },
      {
        id: 'cs-pro-22kw',
        name: 'Station Pro 22kW',
        slug: 'station-pro-22kw',
        description: 'Borne de recharge triphasée 22kW avec authentification RFID et connexion réseau pour gestion à distance.',
        price: 1599,
        category_id: 'stations',
        stock_quantity: 20,
        featured: false,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1558435091-c3d950121fa2',
        specifications: JSON.stringify({
          power: '22kW',
          connector: 'Type 2',
          installation: 'Sur pied ou murale',
          connectivity: 'Wi-Fi, Ethernet, 4G',
          authentication: 'RFID, App mobile'
        })
      },
      // Goodies
      {
        id: 'goodies-tshirt',
        name: 'T-shirt Eco-Power',
        slug: 't-shirt-eco-power',
        description: 'T-shirt 100% coton bio avec impression Eco-Power. Disponible en plusieurs tailles.',
        price: 24.90,
        category_id: 'goodies',
        stock_quantity: 100,
        featured: false,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        specifications: JSON.stringify({
          material: '100% coton bio',
          available_sizes: 'S, M, L, XL',
          colors: 'Blanc, Noir, Vert'
        })
      },
      {
        id: 'goodies-bottle',
        name: 'Gourde Isotherme',
        slug: 'gourde-isotherme',
        description: 'Gourde isotherme 500ml en acier inoxydable, maintient vos boissons chaudes 12h et froides 24h.',
        price: 29.90,
        category_id: 'goodies',
        stock_quantity: 80,
        featured: false,
        is_digital: false,
        main_image_url: 'https://images.unsplash.com/photo-1610142991820-e03b91ecdda8',
        specifications: JSON.stringify({
          material: 'Acier inoxydable double paroi',
          capacity: '500ml',
          colors: 'Argent, Noir, Bleu'
        })
      },
      // Gift Cards
      {
        id: 'gift-card-50',
        name: 'Carte Cadeau 50 CHF',
        slug: 'carte-cadeau-50-chf',
        description: 'Carte cadeau d\'une valeur de 50 CHF, valable sur tout le site et dans nos stations de recharge.',
        price: 50,
        category_id: 'gift-cards',
        stock_quantity: 999,
        featured: false,
        is_digital: true,
        main_image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
        specifications: JSON.stringify({
          value: '50 CHF',
          validity: '12 mois',
          format: 'Code numérique par email'
        })
      },
      {
        id: 'gift-card-100',
        name: 'Carte Cadeau 100 CHF',
        slug: 'carte-cadeau-100-chf',
        description: 'Carte cadeau d\'une valeur de 100 CHF, valable sur tout le site et dans nos stations de recharge.',
        price: 100,
        category_id: 'gift-cards',
        stock_quantity: 999,
        featured: false,
        is_digital: true,
        main_image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
        specifications: JSON.stringify({
          value: '100 CHF',
          validity: '12 mois',
          format: 'Code numérique par email ou carte physique'
        })
      }
    ];
    
    // Insert products
    for (const product of products) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'id' });
      
      if (error) {
        console.error(`Erreur lors de l'ajout du produit ${product.name}:`, error);
        toast.error(`Erreur: ${error.message}`);
        return false;
      }
    }
    
    // Add some variants for products that have them
    const variants = [
      // T-shirt variants
      {
        id: 'tshirt-white-s',
        product_id: 'goodies-tshirt',
        name: 'Blanc - Taille S',
        sku: 'TS-WHITE-S',
        price: 24.90,
        stock_quantity: 25,
        attributes: JSON.stringify({
          color: 'Blanc',
          size: 'S'
        })
      },
      {
        id: 'tshirt-white-m',
        product_id: 'goodies-tshirt',
        name: 'Blanc - Taille M',
        sku: 'TS-WHITE-M',
        price: 24.90,
        stock_quantity: 30,
        attributes: JSON.stringify({
          color: 'Blanc',
          size: 'M'
        })
      },
      {
        id: 'tshirt-black-m',
        product_id: 'goodies-tshirt',
        name: 'Noir - Taille M',
        sku: 'TS-BLACK-M',
        price: 24.90,
        stock_quantity: 30,
        attributes: JSON.stringify({
          color: 'Noir',
          size: 'M'
        })
      },
      {
        id: 'tshirt-green-l',
        product_id: 'goodies-tshirt',
        name: 'Vert - Taille L',
        sku: 'TS-GREEN-L',
        price: 24.90,
        stock_quantity: 15,
        attributes: JSON.stringify({
          color: 'Vert',
          size: 'L'
        })
      },
      // Bottle variants
      {
        id: 'bottle-silver',
        product_id: 'goodies-bottle',
        name: 'Gourde Argent',
        sku: 'BOTTLE-SILVER',
        price: 29.90,
        stock_quantity: 30,
        attributes: JSON.stringify({
          color: 'Argent'
        })
      },
      {
        id: 'bottle-black',
        product_id: 'goodies-bottle',
        name: 'Gourde Noir',
        sku: 'BOTTLE-BLACK',
        price: 29.90,
        stock_quantity: 25,
        attributes: JSON.stringify({
          color: 'Noir'
        })
      },
      {
        id: 'bottle-blue',
        product_id: 'goodies-bottle',
        name: 'Gourde Bleu',
        sku: 'BOTTLE-BLUE',
        price: 29.90,
        stock_quantity: 25,
        attributes: JSON.stringify({
          color: 'Bleu'
        })
      }
    ];
    
    // Insert variants
    for (const variant of variants) {
      const { error } = await supabase
        .from('product_variants')
        .upsert(variant, { onConflict: 'id' });
      
      if (error) {
        console.error(`Erreur lors de l'ajout de la variante ${variant.name}:`, error);
        toast.error(`Erreur: ${error.message}`);
        return false;
      }
    }
    
    console.log("Importation des produits terminée avec succès!");
    toast.success("Produits importés avec succès!");
    return true;
    
  } catch (error: any) {
    console.error("Erreur lors de l'importation des produits:", error);
    toast.error(`Erreur: ${error.message}`);
    return false;
  }
};
