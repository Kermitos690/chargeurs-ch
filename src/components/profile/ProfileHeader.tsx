
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <Link to="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Retour à mon compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
};

export default ProfileHeader;
