
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Ajouter des logs pour le débogage
  useEffect(() => {
    console.log("RouteGuard - État actuel:", { isAuthenticated: !!user, isLoading: loading });
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification de votre connexion...</span>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the location they were trying to access
    console.log("RouteGuard - Redirection vers la page de connexion, emplacement actuel:", location.pathname);
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  console.log("RouteGuard - Utilisateur authentifié, affichage du contenu protégé");
  return <>{children}</>;
};

export default RouteGuard;
