
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4">Chargement de votre profil...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSkeleton;
