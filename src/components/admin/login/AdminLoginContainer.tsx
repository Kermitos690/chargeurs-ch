
import React from 'react';
import { motion } from 'framer-motion';

interface AdminLoginContainerProps {
  children: React.ReactNode;
}

const AdminLoginContainer = ({ children }: AdminLoginContainerProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <motion.div 
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminLoginContainer;
