
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from '@/services/firebase/auth';
import { updateUserProfile } from '@/services/supabase/profile';
import { toast } from "sonner";

interface PersonalInfoFormProps {
  user: {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  };
  userData: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ user, userData }) => {
  const [name, setName] = useState(userData?.name || user?.displayName || '');
  const [email, setEmail] = useState(userData?.email || user?.email || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Mettre à jour le profil Firebase (name, photo, etc.)
      const firebaseResult = await updateProfile({
        displayName: name,
      });

      // Mettre à jour les données utilisateur dans Supabase
      if (user.uid) {
        const supabaseResult = await updateUserProfile(user.uid, {
          name,
          email,
          phone
        });

        if (firebaseResult.success && supabaseResult.success) {
          toast.success("Vos informations ont été mises à jour avec succès.");
        } else {
          setError("Une erreur est survenue lors de la mise à jour de vos informations.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setError("Une erreur est survenue lors de la mise à jour de vos informations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium">Informations personnelles</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly
        />
        <p className="text-xs text-gray-500">L'email ne peut pas être modifié</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input 
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
