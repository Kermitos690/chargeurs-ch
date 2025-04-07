
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import About from './pages/About';
import StationsMap from './pages/StationsMap';
import Subscriptions from './pages/Subscriptions';
import Appointment from './pages/Appointment';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Rentals from './pages/Rentals';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import NewPassword from './pages/auth/NewPassword';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';
import Installation from './pages/services/Installation';
import RouteGuard from './components/RouteGuard';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminPowerBanks from './pages/admin/PowerBanks';
import Features from './pages/Features';
import ProductsPage from './pages/shop/Products';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import CheckoutSuccess from './pages/shop/CheckoutSuccess';
import CheckoutCancel from './pages/shop/CheckoutCancel';
import Confidentialite from './pages/Confidentialite';
import Conditions from './pages/Conditions';
import Carrieres from './pages/Carrieres';
import Cookies from './pages/Cookies';
import Sitemap from './pages/Sitemap';
import Residentiels from './pages/produits/Residentiels';
import Publiques from './pages/produits/Publiques';
import Entreprises from './pages/produits/Entreprises';
import Accessoires from './pages/produits/Accessoires';
import ProductSeed from './pages/admin/ProductSeed';

// Nouvelles pages de fonctionnalités
import Charging from './pages/features/Charging';
import Connectivity from './pages/features/Connectivity';
import Security from './pages/features/Security';

// Nouvelles pages à propos
import Company from './pages/about/Company'; 
import Team from './pages/about/Team';
import History from './pages/about/History';

// Créer une instance de QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/stations" element={<StationsMap />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          
          {/* Feature Sub-pages */}
          <Route path="/features/charging" element={<Charging />} />
          <Route path="/features/connectivity" element={<Connectivity />} />
          <Route path="/features/security" element={<Security />} />
          
          {/* About Sub-pages */}
          <Route path="/about/company" element={<Company />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/history" element={<History />} />
          
          {/* Shop Routes */}
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:slug" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          
          {/* Product Category Pages */}
          <Route path="/produits/residentiels" element={<Residentiels />} />
          <Route path="/produits/publiques" element={<Publiques />} />
          <Route path="/produits/entreprises" element={<Entreprises />} />
          <Route path="/produits/accessoires" element={<Accessoires />} />
          
          {/* Services Routes */}
          <Route path="/services/installation" element={<Installation />} />
          
          {/* Legal Routes */}
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/carrieres" element={<Carrieres />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          
          {/* Protected Routes */}
          <Route element={<RouteGuard />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/rentals" element={<Rentals />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/powerbanks" element={<AdminPowerBanks />} />
          <Route path="/admin/seed-products" element={<ProductSeed />} />
          
          {/* Error Pages */}
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
