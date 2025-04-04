
import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthGuard from './AuthGuard';

const AdminLayout = () => {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};

export default AdminLayout;
