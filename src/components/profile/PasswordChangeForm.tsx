
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updatePassword } from '@/services/firebase/auth';

interface PasswordChangeFormProps {
  userId: string;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updatePassword(currentPassword, newPassword);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success("Votre mot de passe a été changé avec succès.");
      } else {
        setError(result.error || "Une erreur est survenue lors de la modification du mot de passe.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du mot de passe:", error);
      setError("Une erreur est survenue lors de la modification du mot de passe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium">Modifier votre mot de passe</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="current-password">Mot de passe actuel</Label>
        <Input 
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="new-password">Nouveau mot de passe</Label>
        <Input 
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
        <Input 
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Modification en cours..." : "Modifier le mot de passe"}
      </Button>
    </form>
  );
};

export default PasswordChangeForm;
