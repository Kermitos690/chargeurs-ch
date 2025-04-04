
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqItems = [
    {
      question: "Comment fonctionnent les bornes de recharge ?",
      answer: "Nos bornes de recharge sont conçues pour être simples d'utilisation. Il suffit de brancher votre véhicule électrique à la borne, de vous identifier via l'application mobile ou votre carte RFID, et la recharge commence automatiquement. Vous pouvez suivre la progression de la recharge en temps réel via notre application."
    },
    {
      question: "Quels types de connecteurs proposez-vous ?",
      answer: "Nous proposons plusieurs types de connecteurs compatibles avec la majorité des véhicules électriques : Type 2 (le standard européen), CCS Combo 2 pour la recharge rapide, et CHAdeMO. Nos conseillers peuvent vous aider à déterminer quel type de connecteur convient le mieux à votre véhicule."
    },
    {
      question: "Quelle est la durée d'installation d'une borne résidentielle ?",
      answer: "L'installation d'une borne résidentielle prend généralement entre 2 et 4 heures, selon la complexité de votre installation électrique. Notre équipe d'installateurs certifiés s'occupe de tout, de la livraison à la mise en service, en passant par les tests de sécurité."
    },
    {
      question: "Proposez-vous des solutions pour les copropriétés ?",
      answer: "Oui, nous avons des solutions spécifiques pour les copropriétés. Nos systèmes permettent une gestion intelligente de l'énergie, une facturation individuelle précise, et peuvent s'adapter à différentes configurations de parkings. Contactez-nous pour une étude personnalisée de votre projet."
    },
    {
      question: "Vos bornes sont-elles compatibles avec tous les véhicules électriques ?",
      answer: "Nos bornes sont compatibles avec la grande majorité des véhicules électriques disponibles sur le marché. Nous proposons différents types de connecteurs et nos solutions s'adaptent aux différentes puissances de charge acceptées par les véhicules."
    },
    {
      question: "Quelles sont les aides financières disponibles pour l'installation d'une borne ?",
      answer: "En Suisse, plusieurs cantons offrent des subventions pour l'installation de bornes de recharge. De plus, certaines entreprises d'électricité proposent des tarifs préférentiels. Lors de notre consultation, nous vous informerons des aides disponibles dans votre région."
    },
    {
      question: "Comment fonctionne la maintenance de vos bornes ?",
      answer: "Nous proposons des contrats de maintenance qui incluent des vérifications régulières, des mises à jour logicielles, et un service de dépannage rapide en cas de problème. Nos bornes sont également équipées d'un système de diagnostic à distance qui nous permet d'anticiper et de résoudre de nombreux problèmes avant qu'ils n'affectent votre usage."
    },
    {
      question: "Puis-je contrôler ma borne à distance ?",
      answer: "Oui, toutes nos bornes sont connectées et peuvent être contrôlées via notre application mobile. Vous pouvez démarrer ou arrêter une recharge, programmer des sessions, suivre votre consommation et recevoir des notifications en temps réel."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Questions Fréquemment Posées</h1>
            <p className="text-lg text-muted-foreground">
              Retrouvez ici les réponses aux questions les plus courantes sur nos produits et services.
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-12">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-accent p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h2>
            <p className="mb-4">Contactez notre équipe de support qui se fera un plaisir de vous aider.</p>
            <div className="flex justify-center gap-4">
              <a href="tel:+41223000000" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                +41 22 300 00 00
              </a>
              <a href="mailto:contact@chargeurs.ch" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                contact@chargeurs.ch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
