
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
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
import { fromTimestamp } from '@/services/admin';
import { User } from '@/types/api';

interface UsersListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersList = ({ users, onEdit, onDelete }: UsersListProps) => {
  return (
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
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Aucun utilisateur trouvé
            </TableCell>
          </TableRow>
        )}
        
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone || 'N/A'}</TableCell>
            <TableCell>
              {user.subscriptionType 
                ? user.subscriptionType.charAt(0).toUpperCase() + user.subscriptionType.slice(1) 
                : 'Aucun'}
            </TableCell>
            <TableCell>
              {user.createdAt 
                ? new Date(fromTimestamp(user.createdAt)).toLocaleDateString() 
                : 'N/A'}
            </TableCell>
            <TableCell className="text-right flex justify-end space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEdit(user)}
                title="Modifier"
              >
                <Edit size={16} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-destructive" 
                onClick={() => onDelete(user)}
                title="Supprimer"
              >
                <Trash2 size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersList;
