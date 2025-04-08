import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children?: React.ReactNode;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
}

const AuthGuard = ({ children, adminOnly = false, superAdminOnly = false }: AuthGuardProps) => {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (adminOnly && !isAdmin && !isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default AuthGuard;
