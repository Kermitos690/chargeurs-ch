
import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import AdminSidebar from './AdminSidebar';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const AdminLayout = () => {
  return (
    <AuthGuard adminOnly>
      <TooltipProvider>
        <div className="flex h-screen">
          <AdminSidebar />
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
          <Toaster />
        </div>
      </TooltipProvider>
    </AuthGuard>
  );
};

export default AdminLayout;
