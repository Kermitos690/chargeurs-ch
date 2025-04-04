
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const Confidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Politique de Confidentialité</h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : 1er avril 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead">
              Chez Chargeurs.ch, nous attachons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.
            </p>

            <Separator className="my-6" />

            <h2>1. Informations que nous collectons</h2>
            <p>
              Nous collectons différents types d'informations vous concernant, notamment:
            </p>
            <ul>
              <li>
                <strong>Informations d'identification</strong>: nom, prénom, adresse email, numéro de téléphone, adresse postale
              </li>
              <li>
                <strong>Informations de paiement</strong>: coordonnées bancaires, historique des transactions
              </li>
              <li>
                <strong>Informations d'utilisation</strong>: données de recharge, localisation des bornes utilisées, préférences d'utilisation
              </li>
              <li>
                <strong>Informations techniques</strong>: adresse IP, type d'appareil, navigateur, système d'exploitation, cookies
              </li>
            </ul>

            <Separator className="my-6" />

            <h2>2. Comment nous utilisons vos informations</h2>
            <p>
              Vos informations sont utilisées pour:
            </p>
            <ul>
              <li>Fournir, exploiter et améliorer nos services</li>
              <li>Traiter vos paiements et facturations</li>
              <li>Vous contacter concernant votre compte ou vos transactions</li>
              <li>Vous envoyer des informations techniques, des mises à jour ou des alertes de sécurité</li>
              <li>Vous fournir un support client</li>
              <li>Respecter nos obligations légales</li>
              <li>Prévenir les fraudes et améliorer la sécurité</li>
              <li>Personnaliser votre expérience et vous proposer des contenus adaptés</li>
            </ul>

            <Separator className="my-6" />

            <h2>3. Partage de vos informations</h2>
            <p>
              Nous pouvons partager vos informations avec:
            </p>
            <ul>
              <li>Nos prestataires de services (paiement, hébergement, maintenance, etc.)</li>
              <li>Nos partenaires commerciaux dans le cadre de services conjoints</li>
              <li>Les autorités légales en cas d'obligation légale</li>
              <li>Lors d'une fusion, acquisition ou vente d'actifs</li>
            </ul>
            
            <p>
              Nous ne vendons pas vos données personnelles à des tiers à des fins de marketing direct.
            </p>

            <Separator className="my-6" />

            <h2>4. Protection de vos informations</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
            
            <p>
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
            </p>

            <Separator className="my-6" />

            <h2>5. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales.
            </p>
            
            <p>
              Lorsque nous n'avons plus besoin de vos données, nous les supprimons ou les anonymisons de manière sécurisée.
            </p>

            <Separator className="my-6" />

            <h2>6. Vos droits</h2>
            <p>
              Conformément aux lois applicables sur la protection des données, vous disposez de certains droits concernant vos données personnelles:
            </p>
            <ul>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retirer votre consentement</li>
              <li>Droit de déposer une plainte auprès d'une autorité de protection des données</li>
            </ul>
            
            <p>
              Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée à la fin de cette politique.
            </p>

            <Separator className="my-6" />

            <h2>7. Cookies et technologies similaires</h2>
            <p>
              Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre expérience sur notre site et notre application.
            </p>
            
            <p>
              Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur. Cependant, certaines fonctionnalités de nos services peuvent ne pas fonctionner correctement si vous désactivez les cookies.
            </p>

            <Separator className="my-6" />

            <h2>8. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons de tout changement significatif par email ou par une notification sur notre site.
            </p>
            
            <p>
              Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des dernières informations concernant nos pratiques de confidentialité.
            </p>

            <Separator className="my-6" />

            <h2>9. Contact</h2>
            <p>
              Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, veuillez nous contacter à:
            </p>
            <address className="not-italic">
              Responsable de la protection des données<br />
              Chargeurs.ch SA<br />
              Rue de la Mobilité 123<br />
              1004 Lausanne, Suisse<br />
              Email: privacy@chargeurs.ch<br />
              Téléphone: +41 21 123 45 67
            </address>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Confidentialite;
