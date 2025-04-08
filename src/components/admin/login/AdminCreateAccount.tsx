
import React, { useState } from 'react';
import { Shield, Loader2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createInitialAdmin, getDefaultAdminCredentials } from '@/services/supabase/initialAdmin';
import { useForm } from 'react-hook-form';

interface AdminCreateAccountProps {
  adminExists: boolean;
  setAdminExists: (exists: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  form: any;
}

const AdminCreateAccount = ({ 
  adminExists, 
  setAdminExists, 
  setErrorMessage,
  form 
}: AdminCreateAccountProps) => {
  const { toast } = useToast();
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  const handleCreateAdmin = async () => {
    setIsCreatingAdmin(true);
    setErrorMessage(null);
    try {
      const result = await createInitialAdmin();
      
      if (result) {
        // Le compte admin a été créé avec succès
        const credentials = getDefaultAdminCredentials();
        
        // Préremplir le formulaire avec les identifiants créés
        form.setValue('email', credentials.email);
        form.setValue('password', credentials.password);
        
        toast({
          title: 'Compte administrateur créé',
          description: 'Les identifiants ont été insérés dans le formulaire',
        });
        
        setAdminExists(true);
      } else {
        setErrorMessage('Impossible de créer le compte administrateur');
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de créer le compte administrateur',
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte admin:", error);
      setErrorMessage('Une erreur est survenue lors de la création du compte');
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création du compte',
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const fillDefaultCredentials = () => {
    const credentials = getDefaultAdminCredentials();
    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);
    
    toast({
      title: 'Identifiants remplis',
      description: 'Utilisez ces identifiants pour vous connecter',
    });
  };

  return (
    <div className="mt-4 flex justify-center gap-2">
      {!adminExists && (
        <Button
          type="button"
          onClick={handleCreateAdmin}
          className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-1 focus:ring-gray-400"
          variant="outline"
          size="sm"
          disabled={isCreatingAdmin}
        >
          {isCreatingAdmin ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Création...
            </>
          ) : (
            <>
              <Shield className="mr-1 h-3 w-3" />
              Créer compte admin
            </>
          )}
        </Button>
      )}
      
      {adminExists && (
        <Button
          type="button"
          onClick={fillDefaultCredentials}
          className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-1 focus:ring-gray-400"
          variant="outline"
          size="sm"
        >
          <Key className="mr-1 h-3 w-3" />
          Afficher identifiants
        </Button>
      )}
    </div>
  );
};

export default AdminCreateAccount;
