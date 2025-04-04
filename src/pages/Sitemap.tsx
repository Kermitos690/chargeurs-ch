
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { FolderTree, Users, ShoppingBag, Settings, Shield, FileText, HelpCircle } from 'lucide-react';

const Sitemap = () => {
  const siteMap = [
    {
      title: "Pages Principales",
      icon: <FolderTree className="h-5 w-5" />,
      links: [
        { name: "Accueil", path: "/" },
        { name: "Nos Fonctionnalités", path: "/features" },
        { name: "À Propos", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Nos Bornes", path: "/stations" },
      ]
    },
    {
      title: "Nos Produits",
      icon: <ShoppingBag className="h-5 w-5" />,
      links: [
        { name: "Bornes Résidentielles", path: "/produits/residentiels" },
        { name: "Solutions pour Entreprises", path: "/produits/entreprises" },
        { name: "Stations Publiques", path: "/produits/publiques" },
        { name: "Accessoires", path: "/produits/accessoires" },
      ]
    },
    {
      title: "Nos Services",
      icon: <Settings className="h-5 w-5" />,
      links: [
        { name: "Installation", path: "/services/installation" },
        { name: "Maintenance", path: "/maintenance" },
        { name: "Rendez-vous", path: "/appointment" },
      ]
    },
    {
      title: "Espace Client",
      icon: <Users className="h-5 w-5" />,
      links: [
        { name: "Connexion", path: "/auth/login" },
        { name: "Inscription", path: "/auth/register" },
        { name: "Réinitialisation de mot de passe", path: "/auth/reset-password" },
        { name: "Mon Compte", path: "/account" },
        { name: "Mes Locations", path: "/rentals" },
        { name: "Mes Abonnements", path: "/subscriptions" },
        { name: "Mon Profil", path: "/profile" },
      ]
    },
    {
      title: "Administration",
      icon: <Shield className="h-5 w-5" />,
      links: [
        { name: "Connexion Admin", path: "/admin/login" },
        { name: "Tableau de Bord", path: "/admin/dashboard" },
        { name: "Gestion des Utilisateurs", path: "/admin/users" },
        { name: "Gestion des Powerbanks", path: "/admin/powerbanks" },
      ]
    },
    {
      title: "Informations Légales",
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: "Conditions d'Utilisation", path: "/conditions" },
        { name: "Politique de Confidentialité", path: "/confidentialite" },
        { name: "Politique de Cookies", path: "/cookies" },
      ]
    },
    {
      title: "Autres",
      icon: <HelpCircle className="h-5 w-5" />,
      links: [
        { name: "Carrières", path: "/carrieres" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Plan du Site</h1>
            <p className="text-lg text-muted-foreground">
              Retrouvez ici toutes les pages de notre site pour une navigation simplifiée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {siteMap.map((section, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-muted/50 flex items-center gap-2">
                  {section.icon}
                  <h2 className="font-semibold">{section.title}</h2>
                </div>
                <ul className="p-4 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.path} className="text-primary hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-accent p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Besoin d'aide pour trouver une information spécifique ?</h2>
            <p className="mb-4">Notre équipe de support est disponible pour vous aider à naviguer sur notre site.</p>
            <div className="flex justify-center">
              <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Contactez-nous
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
