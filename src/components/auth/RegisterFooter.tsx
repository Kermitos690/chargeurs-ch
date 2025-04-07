
import React from 'react';
import { Link } from 'react-router-dom';
import { CardFooter } from "@/components/ui/card";

const RegisterFooter: React.FC = () => {
  return (
    <CardFooter className="pt-4">
      <div className="text-center text-sm w-full">
        Déjà un compte?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Se connecter
        </Link>
      </div>
    </CardFooter>
  );
};

export default RegisterFooter;
