
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RouteGuard from './components/RouteGuard';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminLayout from './components/AdminLayout';
import AuthGuard from './components/AuthGuard';
import NewPassword from './pages/auth/NewPassword';
import MFASetup from './pages/auth/MFASetup';
import StationsMap from './pages/StationsMap';
import AdminPowerbanks from './pages/admin/Powerbanks';
import AdminStations from './pages/admin/Stations';
import AdminPayments from './pages/admin/Payments';
import AdminSettings from './pages/admin/Settings';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/new-password" element={<NewPassword />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/" element={<RouteGuard />}>
          <Route path="/stations" element={<StationsMap />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AuthGuard adminOnly />}>
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/powerbanks" element={<AdminLayout><AdminPowerbanks /></AdminLayout>} />
          <Route path="/admin/stations" element={<AdminLayout><AdminStations /></AdminLayout>} />
          <Route path="/admin/payments" element={<AdminLayout><AdminPayments /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        </Route>

        <Route path="/auth/mfa" element={<MFASetup />} />
      </Routes>
    </Router>
  );
}

export default App;
