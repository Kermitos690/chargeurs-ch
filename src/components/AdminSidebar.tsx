
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  UsersRound, 
  Battery, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { logoutAdmin } from '@/services/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord' },
    { path: '/admin/users', icon: <UsersRound size={20} />, label: 'Utilisateurs' },
    { path: '/admin/powerbanks', icon: <Battery size={20} />, label: 'Powerbanks' },
    { path: '/admin/stations', icon: <MapPin size={20} />, label: 'Stations' },
    { path: '/admin/payments', icon: <CreditCard size={20} />, label: 'Paiements' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Paramètres' },
  ];

  const handleLogout = async () => {
    const result = await logoutAdmin();
    if (result.success) {
      toast.success('Déconnexion réussie');
      navigate('/admin/login');
    } else {
      toast.error(`Erreur: ${result.error}`);
    }
  };

  return (
    <div className="w-64 bg-card border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
          <LogOut size={20} />
          <span className="ml-2">Déconnexion</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
