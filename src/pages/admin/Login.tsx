
import React from 'react';
import { useState } from 'react';
import AdminLoginContainer from '@/components/admin/login/AdminLoginContainer';
import AdminLoginHeader from '@/components/admin/login/AdminLoginHeader';
import AdminLoginFooter from '@/components/admin/login/AdminLoginFooter';
import AdminLoginError from '@/components/admin/login/AdminLoginError';
import AdminCreateAccount from '@/components/admin/login/AdminCreateAccount';
import AdminLoginForm from '@/components/admin/login/AdminLoginForm';
import { useAdminLogin } from '@/hooks/useAdminLogin';

const AdminLogin = () => {
  const {
    form,
    isPulsing,
    adminExists,
    setAdminExists,
    errorMessage,
    setErrorMessage
  } = useAdminLogin();

  return (
    <AdminLoginContainer>
      <AdminLoginHeader isPulsing={isPulsing} />
      
      <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-sm">
        <AdminLoginError errorMessage={errorMessage} />
        <AdminLoginForm setErrorMessage={setErrorMessage} />
        
        <AdminCreateAccount 
          adminExists={adminExists} 
          setAdminExists={setAdminExists}
          setErrorMessage={setErrorMessage}
          form={form}
        />
      </div>
      
      <AdminLoginFooter />
    </AdminLoginContainer>
  );
};

export default AdminLogin;
