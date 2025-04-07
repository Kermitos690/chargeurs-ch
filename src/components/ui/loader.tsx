
import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Chargement..." }) => {
  return (
    <div className="text-center py-10">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default Loader;
