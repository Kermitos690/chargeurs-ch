import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import RouteGuard from "@/components/RouteGuard";
import Index from "./pages/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Rentals from "./pages/Rentals";
import Subscriptions from "./pages/Subscriptions";
import Profile from "./pages/Profile";
import StationsMap from "./pages/StationsMap";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPassword from "./pages/auth/NewPassword"; 
import LocationPage from "./pages/location";
import JournalierPage from "./pages/location/journalier";
import HebdomadairePage from "./pages/location/hebdomadaire";
import MensuellePage from "./pages/location/mensuelle";

// Routes d'administration
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminPowerBanks from "./pages/admin/PowerBanks";
import AdminLayout from "./components/AdminLayout";

// Produits
import ProduitsResidentiels from "./pages/produits/Residentiels";
import ProduitsEntreprises from "./pages/produits/Entreprises";
import ProduitsPubliques from "./pages/produits/Publiques";
import ProduitsAccessoires from "./pages/produits/Accessoires";

// Pages de boutique
import Products from "./pages/shop/Products";
import ProductDetail from "./pages/shop/ProductDetail";
import Cart from "./pages/shop/Cart";
import CheckoutSuccess from "./pages/shop/CheckoutSuccess";
import CheckoutCancel from "./pages/shop/CheckoutCancel";
import AllProducts from './pages/shop/AllProducts';

// Services
import ServicesInstallation from "./pages/services/Installation";

// Pages supplémentaires
import FAQ from "./pages/FAQ";
import Maintenance from "./pages/Maintenance";
import Carrieres from "./pages/Carrieres";
import Conditions from "./pages/Conditions";
import Confidentialite from "./pages/Confidentialite";
import Cookies from "./pages/Cookies";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Routes d'authentification */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/new-password" element={<NewPassword />} />
            
            {/* Routes protégées qui nécessitent une connexion */}
            <Route path="/account" element={<RouteGuard><Account /></RouteGuard>} />
            <Route path="/rentals" element={<RouteGuard><Rentals /></RouteGuard>} />
            <Route path="/subscriptions" element={<RouteGuard><Subscriptions /></RouteGuard>} />
            <Route path="/profile" element={<RouteGuard><Profile /></RouteGuard>} />
            <Route path="/stations" element={<RouteGuard><StationsMap /></RouteGuard>} />
            <Route path="/appointment" element={<RouteGuard><Appointment /></RouteGuard>} />
            
            {/* Routes de boutique */}
            <Route path="/produits" element={<Products />} />
            <Route path="/produits/:slug" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            
            {/* Routes de produits */}
            <Route path="/produits/residentiels" element={<ProduitsResidentiels />} />
            <Route path="/produits/entreprises" element={<ProduitsEntreprises />} />
            <Route path="/produits/publiques" element={<ProduitsPubliques />} />
            <Route path="/produits/accessoires" element={<ProduitsAccessoires />} />
            
            {/* Routes de services */}
            <Route path="/services/installation" element={<ServicesInstallation />} />
            
            {/* Pages supplémentaires */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/carrieres" element={<Carrieres />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Routes d'administration */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="powerbanks" element={<AdminPowerBanks />} />
              {/* Autres routes admin protégées peuvent être ajoutées ici */}
            </Route>
            
            {/* Route pour les utilisateurs non autorisés */}
            <Route path="/unauthorized" element={<div className="flex h-screen items-center justify-center flex-col">
              <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
              <p>Vous n'avez pas les droits pour accéder à cette page.</p>
            </div>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
