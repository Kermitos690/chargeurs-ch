
import React from 'react';
import { Link } from 'react-router-dom';
import { CardFooter } from "@/components/ui/card";

const LoginFooter: React.FC = () => {
  return (
    <CardFooter className="flex flex-col space-y-4 pt-0">
      <div className="relative w-full my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">
            ou
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Pas encore de compte?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Créer un compte
        </Link>
      </div>
    </CardFooter>
  );
};

export default LoginFooter;
