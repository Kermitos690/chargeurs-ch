
import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <AuthGuard adminOnly>
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
