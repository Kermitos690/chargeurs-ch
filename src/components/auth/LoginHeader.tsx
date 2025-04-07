
import React from 'react';
import { Battery } from 'lucide-react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
        <Battery className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Connexion</h1>
      <p className="text-muted-foreground mt-1">
        Connectez-vous pour accéder à nos bornes de recharge
      </p>
    </div>
  );
};

export default LoginHeader;
