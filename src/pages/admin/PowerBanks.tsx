
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
import { PowerBank } from '@/types/api';
import { toast } from 'sonner';
import { 
  Loader2, 
  Search, 
  RefreshCw, 
  Edit, 
  Trash2, 
  Battery, 
  BatteryCharging, 
  BatteryLow,
  BatteryWarning
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminPowerBanks = () => {
  const [powerBanks, setPowerBanks] = useState<PowerBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPowerBanks();
  }, []);

  const fetchPowerBanks = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('powerbanks')
        .select('*');
        
      if (error) throw error;
      
      // Convertir les données au format attendu
      const typedData = data.map((item: any) => ({
        id: item.id,
        code: item.code || 'N/A',
        serialNumber: item.code || 'N/A', // Utiliser code comme serialNumber
        batteryLevel: item.battery_level || 0,
        capacity: item.capacity || 0,
        status: item.status || 'maintenance',
        lastUpdated: item.updated_at
      }));
      
      setPowerBanks(typedData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des powerbanks:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, serialNumber: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la powerbank ${serialNumber} ?`)) {
      try {
        const { error } = await supabase
          .from('powerbanks')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        toast.success(`Powerbank ${serialNumber} supprimée avec succès`);
        fetchPowerBanks();
      } catch (error: any) {
        console.error("Erreur lors de la suppression:", error);
        toast.error(`Erreur: ${error.message}`);
      }
    }
  };

  const refreshBatteryLevel = async (powerBank: PowerBank) => {
    setRefreshing(prev => ({ ...prev, [powerBank.id]: true }));
    
    try {
      // Simulate fetching from Blynk by waiting 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purpose, we'll generate a random battery level
      const newBatteryLevel = Math.floor(Math.random() * 100);
      
      // Update in database
      const { error } = await supabase
        .from('powerbanks')
        .update({ battery_level: newBatteryLevel, updated_at: new Date().toISOString() })
        .eq('id', powerBank.id);
        
      if (error) throw error;
      
      // Update local state
      setPowerBanks(prevBanks => 
        prevBanks.map(pb => 
          pb.id === powerBank.id ? { ...pb, batteryLevel: newBatteryLevel } : pb
        )
      );
      
      toast.success(`Niveau de batterie de ${powerBank.serialNumber} mis à jour`);
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setRefreshing(prev => ({ ...prev, [powerBank.id]: false }));
    }
  };

  const getBatteryIcon = (level: number) => {
    if (level >= 75) return <Battery className="h-5 w-5 text-green-500" />;
    if (level >= 50) return <Battery className="h-5 w-5 text-yellow-500" />;
    if (level >= 25) return <BatteryLow className="h-5 w-5 text-orange-500" />;
    return <BatteryWarning className="h-5 w-5 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'available':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Disponible</span>;
      case 'rented':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Louée</span>;
      case 'maintenance':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>Maintenance</span>;
      case 'charging':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800 flex items-center gap-1`}>
          <BatteryCharging className="h-3 w-3" />
          En charge
        </span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const filteredPowerBanks = powerBanks.filter(pb => 
    pb.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pb.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des powerbanks</h1>
        <Button>Ajouter une powerbank</Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par numéro de série..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement des powerbanks...</span>
        </div>
      ) : (
        <Table>
          <TableCaption>Liste des powerbanks du réseau</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro de série</TableHead>
              <TableHead>Niveau de batterie</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPowerBanks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Aucune powerbank trouvée
                </TableCell>
              </TableRow>
            )}
            
            {filteredPowerBanks.map((powerBank) => (
              <TableRow key={powerBank.id}>
                <TableCell className="font-medium">{powerBank.serialNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getBatteryIcon(powerBank.batteryLevel)}
                    <div className="flex-1">
                      <Progress value={powerBank.batteryLevel} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">{powerBank.batteryLevel}%</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0" 
                      onClick={() => refreshBatteryLevel(powerBank)}
                      disabled={refreshing[powerBank.id]}
                    >
                      <RefreshCw className={`h-4 w-4 ${refreshing[powerBank.id] ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{powerBank.capacity} mAh</TableCell>
                <TableCell>{getStatusBadge(powerBank.status)}</TableCell>
                <TableCell className="text-right flex justify-end space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(powerBank.id, powerBank.serialNumber)}>
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

export default AdminPowerBanks;
