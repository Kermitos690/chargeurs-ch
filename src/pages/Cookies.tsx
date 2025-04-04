
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Politique de Cookies</h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : 1er avril 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead">
              Cette politique de cookies explique ce que sont les cookies, comment Chargeurs.ch les utilise, et quelles sont vos options concernant leur utilisation.
            </p>

            <Separator className="my-6" />

            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir des informations aux propriétaires du site.
            </p>
            
            <p>
              Les cookies peuvent être "persistants" ou "de session". Les cookies persistants restent sur votre appareil pendant une période définie dans le cookie, et sont activés chaque fois que vous visitez le site web qui a créé ce cookie. Les cookies de session sont supprimés lorsque vous fermez votre navigateur.
            </p>

            <Separator className="my-6" />

            <h2>2. Comment utilisons-nous les cookies ?</h2>
            <p>
              Nous utilisons différents types de cookies pour les finalités suivantes:
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Type de cookie</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Cookies nécessaires</TableCell>
                  <TableCell>Ces cookies sont essentiels pour vous permettre de naviguer sur notre site et utiliser ses fonctionnalités. Sans ces cookies, certains services que vous avez demandés ne peuvent pas être fournis.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cookies de fonctionnalité</TableCell>
                  <TableCell>Ces cookies permettent au site de se souvenir des choix que vous faites (comme votre nom d'utilisateur, votre langue ou la région où vous vous trouvez) et fournissent des fonctionnalités améliorées et plus personnelles.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cookies d'analyse/performance</TableCell>
                  <TableCell>Ces cookies nous permettent de reconnaître et compter le nombre de visiteurs et de voir comment les visiteurs se déplacent sur notre site lorsqu'ils l'utilisent. Cela nous aide à améliorer le fonctionnement de notre site.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cookies de ciblage</TableCell>
                  <TableCell>Ces cookies enregistrent votre visite sur notre site, les pages que vous avez visitées et les liens que vous avez suivis. Nous utilisons ces informations pour rendre notre site et la publicité qui y est affichée plus pertinents pour vos intérêts.</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Separator className="my-6" />

            <h2>3. Cookies tiers</h2>
            <p>
              Certains cookies sont placés par des services tiers qui apparaissent sur nos pages. Ils sont utilisés pour:
            </p>
            <ul>
              <li>Analyser le trafic sur notre site (Google Analytics)</li>
              <li>Intégrer les fonctionnalités de médias sociaux (Facebook, Twitter, LinkedIn)</li>
              <li>Améliorer la pertinence des publicités affichées (Google Ads, Facebook Ads)</li>
              <li>Fournir des cartes interactives (Google Maps)</li>
              <li>Traiter les paiements (Stripe)</li>
            </ul>

            <Separator className="my-6" />

            <h2>4. Gestion des cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour qu'ils ne soient pas placés. Toutefois, si vous le faites, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site, et certains services et fonctionnalités peuvent ne pas fonctionner.
            </p>
            
            <p>
              Pour plus d'informations sur la gestion des cookies dans votre navigateur, veuillez consulter:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
            </ul>

            <div className="my-8 p-6 bg-accent rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Vos préférences de cookies</h3>
              <p className="mb-4">
                Vous pouvez choisir les types de cookies que vous acceptez d'utiliser sur notre site. Veuillez noter que certains cookies sont nécessaires au fonctionnement de notre site.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies nécessaires</h4>
                    <p className="text-sm text-muted-foreground">Toujours actifs</p>
                  </div>
                  <Button variant="outline" disabled>Requis</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies de fonctionnalité</h4>
                    <p className="text-sm text-muted-foreground">Améliorent votre expérience</p>
                  </div>
                  <Button variant="outline">Accepter</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies d'analyse</h4>
                    <p className="text-sm text-muted-foreground">Nous aident à améliorer notre site</p>
                  </div>
                  <Button variant="outline">Accepter</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cookies de ciblage</h4>
                    <p className="text-sm text-muted-foreground">Personnalisent les publicités</p>
                  </div>
                  <Button variant="outline">Accepter</Button>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline">Rejeter tout</Button>
                  <Button>Accepter tout</Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <h2>5. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de cookies périodiquement. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des dernières informations concernant notre utilisation des cookies.
            </p>

            <Separator className="my-6" />

            <h2>6. Contact</h2>
            <p>
              Si vous avez des questions ou des préoccupations concernant notre utilisation des cookies, veuillez nous contacter à:
            </p>
            <address className="not-italic">
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

export default Cookies;
