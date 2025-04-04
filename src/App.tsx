
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Routes d'administration
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminPowerBanks from "./pages/admin/PowerBanks";
import AdminLayout from "./components/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stations" element={<StationsMap />} />
          <Route path="/appointment" element={<Appointment />} />
          
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
  </QueryClientProvider>
);

export default App;
