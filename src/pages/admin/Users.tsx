import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { fromTimestamp } from '@/services/firebase/utils';
import { toast } from 'sonner';
import { Loader2, Search, Edit, Trash2 } from 'lucide-react';
import { User } from '@/types/api';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Modification de la méthode formatant les données
  const fetchUsers = async () => {
    setLoading(true);
    
    try {
      // Joindre profiles et user_details pour avoir toutes les informations
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          email,
          phone,
          subscription_type,
          created_at,
          user_details (
            first_name,
            last_name,
            address,
            city,
            postal_code
          )
        `);
        
      if (error) throw error;
      
      // Formater les données
      const typedData = data.map((item: any) => ({
        id: item.id,
        name: item.name || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        subscriptionType: item.subscription_type,
        createdAt: item.created_at
      }));
      
      setUsers(typedData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} ?`)) {
      try {
        // Note: la suppression de l'utilisateur dans auth.users gérera les cascades
        const { error } = await supabase.auth.admin.deleteUser(id);
        
        if (error) throw error;
        
        toast.success(`Utilisateur ${name} supprimé avec succès`);
        fetchUsers();
      } catch (error: any) {
        console.error("Erreur lors de la suppression:", error);
        toast.error(`Erreur: ${error.message}`);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
        <Button>Ajouter un utilisateur</Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un utilisateur..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement des utilisateurs...</span>
        </div>
      ) : (
        <Table>
          <TableCaption>Liste des utilisateurs enregistrés</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Abonnement</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
            
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {user.subscriptionType ? user.subscriptionType.charAt(0).toUpperCase() + user.subscriptionType.slice(1) : 'Aucun'}
                </TableCell>
                <TableCell>
                  {user.createdAt ? new Date(fromTimestamp(user.createdAt)).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell className="text-right flex justify-end space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(user.id, user.name)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminUsers;
