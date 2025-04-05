
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

// Pages principales
import Index from '@/pages/Index';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';
import Cookies from '@/pages/Cookies';
import Confidentialite from '@/pages/Confidentialite';
import Conditions from '@/pages/Conditions';
import Carrieres from '@/pages/Carrieres';
import Sitemap from '@/pages/Sitemap';

// Pages d'authentification
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ResetPassword from '@/pages/auth/ResetPassword';
import NewPassword from '@/pages/auth/NewPassword';

// Pages d'administration
import AdminLogin from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import PowerBanks from '@/pages/admin/PowerBanks';
import Users from '@/pages/admin/Users';
import ManelCRM from '@/pages/admin/ManelCRM';

// Pages de produits
import ProduitsResidentiels from '@/pages/produits/Residentiels';
import ProduitsEntreprises from '@/pages/produits/Entreprises';
import ProduitsPubliques from '@/pages/produits/Publiques';
import ProduitsAccessoires from '@/pages/produits/Accessoires';

// Autres pages
import Account from '@/pages/Account';
import Profile from '@/pages/Profile';
import StationsMap from '@/pages/StationsMap';
import Appointment from '@/pages/Appointment';
import Maintenance from '@/pages/Maintenance';
import Subscriptions from '@/pages/Subscriptions';
import Rentals from '@/pages/Rentals';

// Pages installation
import Installation from '@/pages/services/Installation';

// Boutique
import Products from '@/pages/shop/Products';
import ProductDetail from '@/pages/shop/ProductDetail';
import Cart from '@/pages/shop/Cart';
import CheckoutSuccess from '@/pages/shop/CheckoutSuccess';
import CheckoutCancel from '@/pages/shop/CheckoutCancel';

// Contextes et providers
import { AuthProvider } from '@/hooks/useAuth';
import RouteGuard from '@/components/RouteGuard';
import AuthGuard from '@/components/AuthGuard';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/fonctionnalites" element={<Features />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/carrieres" element={<Carrieres />} />
          <Route path="/plan-du-site" element={<Sitemap />} />
          <Route path="/rdv" element={<Appointment />} />
          <Route path="/abonnements" element={<Subscriptions />} />
          <Route path="/stations" element={<StationsMap />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/locations" element={<Rentals />} />

          {/* Authentification */}
          <Route path="/connexion" element={
            <RouteGuard>
              <Login />
            </RouteGuard>
          } />
          <Route path="/inscription" element={
            <RouteGuard>
              <Register />
            </RouteGuard>
          } />
          <Route path="/reinitialiser-mot-de-passe" element={<ResetPassword />} />
          <Route path="/nouveau-mot-de-passe" element={<NewPassword />} />

          {/* Pages protégées */}
          <Route path="/compte" element={
            <AuthGuard>
              <Account />
            </AuthGuard>
          } />
          <Route path="/profil" element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          } />

          {/* Pages admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AuthGuard adminOnly>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/admin/power-banks" element={
            <AuthGuard adminOnly>
              <PowerBanks />
            </AuthGuard>
          } />
          <Route path="/admin/utilisateurs" element={
            <AuthGuard adminOnly>
              <Users />
            </AuthGuard>
          } />
          <Route path="/admin/crm" element={
            <AuthGuard adminOnly>
              <ManelCRM />
            </AuthGuard>
          } />

          {/* Pages de produits */}
          <Route path="/produits" element={<Products />} />
          <Route path="/produits/:slug" element={<ProductDetail />} />
          <Route path="/produits/residentiels" element={<ProduitsResidentiels />} />
          <Route path="/produits/entreprises" element={<ProduitsEntreprises />} />
          <Route path="/produits/publiques" element={<ProduitsPubliques />} />
          <Route path="/produits/accessoires" element={<ProduitsAccessoires />} />

          {/* Pages boutique */}
          <Route path="/panier" element={<Cart />} />
          <Route path="/shop/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/shop/checkout-cancel" element={<CheckoutCancel />} />

          {/* Services pages */}
          <Route path="/services/installation" element={<Installation />} />

          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <SonnerToaster position="top-right" richColors closeButton />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
