
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Conditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : 1er avril 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation des services offerts par Chargeurs.ch (ci-après "nous", "notre" ou "nos") à travers son site web chargeurs.ch (ci-après le "Site") et son application mobile (ci-après l'"Application").
            </p>
            
            <p>
              En utilisant notre Site, notre Application ou nos services de recharge, vous acceptez d'être lié par les présentes CGU. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser nos services.
            </p>

            <Separator className="my-6" />

            <h2>2. Services Proposés</h2>
            <p>
              Chargeurs.ch propose des services de recharge pour véhicules électriques, comprenant:
            </p>
            <ul>
              <li>La vente et l'installation de bornes de recharge</li>
              <li>La location de powerbanks dans des établissements partenaires</li>
              <li>L'accès à un réseau de bornes de recharge publiques</li>
              <li>Des services de maintenance et de support</li>
              <li>Des abonnements et forfaits de recharge</li>
            </ul>

            <Separator className="my-6" />

            <h2>3. Création de Compte</h2>
            <p>
              Pour accéder à certains services, il est nécessaire de créer un compte utilisateur. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités réalisées sous votre compte.
            </p>
            
            <p>
              Vous vous engagez à fournir des informations exactes, actuelles et complètes lors de la création de votre compte, et à les maintenir à jour.
            </p>

            <Separator className="my-6" />

            <h2>4. Modalités d'Utilisation</h2>
            <p>
              Vous vous engagez à utiliser nos services conformément aux présentes CGU, aux lois applicables et aux bonnes pratiques. Il est notamment interdit:
            </p>
            <ul>
              <li>D'utiliser nos services à des fins illégales ou frauduleuses</li>
              <li>De tenter d'accéder sans autorisation à nos systèmes ou réseaux</li>
              <li>D'endommager, désactiver ou surcharger nos services</li>
              <li>De reproduire, dupliquer, copier ou vendre tout ou partie de nos services</li>
              <li>De transmettre des virus, des chevaux de Troie, des vers ou tout autre matériel malveillant</li>
            </ul>

            <Separator className="my-6" />

            <h2>5. Tarification et Paiement</h2>
            <p>
              Les tarifs de nos services sont indiqués sur notre Site et dans notre Application. Nous nous réservons le droit de modifier nos tarifs à tout moment, sous réserve de vous en informer préalablement.
            </p>
            
            <p>
              Les paiements sont traités par des prestataires de services de paiement sécurisés. En utilisant nos services, vous acceptez les conditions de ces prestataires.
            </p>

            <Separator className="my-6" />

            <h2>6. Responsabilité</h2>
            <p>
              Nous nous efforçons de fournir des services de qualité, mais nous ne pouvons garantir que nos services seront ininterrompus, sécurisés ou exempts d'erreurs.
            </p>
            
            <p>
              Notre responsabilité est limitée aux dommages directs résultant d'une faute prouvée de notre part, à l'exclusion de tout dommage indirect ou consécutif.
            </p>

            <Separator className="my-6" />

            <h2>7. Propriété Intellectuelle</h2>
            <p>
              Tous les droits de propriété intellectuelle relatifs à notre Site, notre Application et nos services sont notre propriété exclusive ou sont utilisés sous licence.
            </p>
            
            <p>
              Vous n'êtes pas autorisé à utiliser, reproduire ou distribuer nos contenus sans notre autorisation préalable écrite.
            </p>

            <Separator className="my-6" />

            <h2>8. Protection des Données</h2>
            <p>
              Nous traitons vos données personnelles conformément à notre Politique de Confidentialité, disponible sur notre Site.
            </p>

            <Separator className="my-6" />

            <h2>9. Modifications des CGU</h2>
            <p>
              Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur notre Site ou notre Application.
            </p>
            
            <p>
              Votre utilisation continue de nos services après la publication des modifications constitue votre acceptation de ces modifications.
            </p>

            <Separator className="my-6" />

            <h2>10. Droit Applicable et Juridiction Compétente</h2>
            <p>
              Les présentes CGU sont régies par le droit suisse. Tout litige relatif à nos services sera soumis à la compétence exclusive des tribunaux de Lausanne, Suisse.
            </p>

            <Separator className="my-6" />

            <h2>11. Garantie</h2>
            <p>
              Nos produits bénéficient des garanties suivantes:
            </p>
            <ul>
              <li>Bornes de recharge: garantie de 24 mois à compter de la date d'achat</li>
              <li>Powerbanks: garantie de 12 mois à compter de la date d'achat</li>
            </ul>
            <p>
              Ces garanties s'appliquent uniquement dans le respect des précautions d'usage et de bonne utilisation des produits, et ne couvrent pas les dommages résultant d'une utilisation inappropriée, d'accidents, ou de modifications non autorisées.
            </p>

            <Separator className="my-6" />

            <h2>12. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, veuillez nous contacter à l'adresse suivante:
            </p>
            <address className="not-italic">
              Chargeurs.ch SA<br />
              Rue de la Mobilité 123<br />
              1004 Lausanne, Suisse<br />
              Email: legal@chargeurs.ch<br />
              Téléphone: +41 21 123 45 67
            </address>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Conditions;
