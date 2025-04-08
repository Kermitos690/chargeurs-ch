
import React from 'react';
import { Battery } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginHeaderProps {
  isPulsing: boolean;
}

const AdminLoginHeader = ({ isPulsing }: AdminLoginHeaderProps) => {
  return (
    <div className="text-center">
      <motion.div 
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 ${isPulsing ? 'animate-pulse' : ''}`}
        animate={{
          boxShadow: isPulsing 
            ? ['0 0 0 rgba(59, 130, 246, 0)', '0 0 25px rgba(59, 130, 246, 0.8)', '0 0 5px rgba(59, 130, 246, 0.3)'] 
            : '0 0 0 rgba(59, 130, 246, 0)'
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Battery className="h-8 w-8 text-white" />
      </motion.div>
      
      <motion.h2 
        className="mt-6 text-3xl font-bold text-white"
      >
        Administration
        <span className="ml-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          chargeurs.ch
        </span>
      </motion.h2>
      
      <motion.p 
        className="mt-2 text-sm text-gray-400"
      >
        Connectez-vous pour accéder au panneau d'administration
      </motion.p>
    </div>
  );
};

export default AdminLoginHeader;
