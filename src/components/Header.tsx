import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';
import { clearCart } from '@/services/cart'; // Import clearCart
import { toast } from 'sonner';
// Ajouter l'import pour CartIcon
import CartIcon from './shop/CartIcon';

const Header = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await clearCart(user?.uid); // Clear cart on logout
      await auth.signOut();
      navigate('/auth/login');
      toast.success("Déconnexion réussie !");
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <header className="bg-background border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-2xl">
          Chargeurs Coop
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary underline underline-offset-4" : ""}>
            Accueil
          </NavLink>
          <NavLink to="/features" className={({ isActive }) => isActive ? "text-primary underline underline-offset-4" : ""}>
            Fonctionnalités
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary underline underline-offset-4" : ""}>
            À propos
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary underline underline-offset-4" : ""}>
            Contact
          </NavLink>
          <NavLink to="/produits" className={({ isActive }) => isActive ? "text-primary underline underline-offset-4" : ""}>
            Boutique
          </NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <CartIcon />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData?.name ? `https://ui-avatars.com/api/?name=${userData?.name}` : ""} alt={userData?.name} />
                    <AvatarFallback>{userData?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/faq')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth/login')}>
                Se connecter
              </Button>
              <Button size="sm" onClick={() => navigate('/auth/register')}>
                S'inscrire
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
