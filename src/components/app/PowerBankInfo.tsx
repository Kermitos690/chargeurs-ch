
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PowerBankInfoProps {
  powerBank: {
    id: string;
    serialNumber: string;
    batteryLevel: number;
    status: string;
    stationId: string;
    stationName: string;
    price: number;
    pricePerHour: number;
  };
}

const PowerBankInfo: React.FC<PowerBankInfoProps> = ({ powerBank }) => {
  // Function to determine the color based on battery level
  const getBatteryColor = (level: number) => {
    if (level >= 70) return 'bg-green-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery size={20} />
          Powerbank {powerBank.serialNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Emplacement</p>
            <div className="flex items-center mt-1">
              <MapPin size={16} className="mr-1 text-primary" />
              <span>{powerBank.stationName}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Statut</p>
            <div className="flex items-center mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span className="capitalize">{powerBank.status === 'available' ? 'Disponible' : powerBank.status}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <p className="text-sm font-medium text-muted-foreground">Niveau de batterie</p>
            <span className="text-sm font-medium">{powerBank.batteryLevel}%</span>
          </div>
          <Progress value={powerBank.batteryLevel} className={getBatteryColor(powerBank.batteryLevel)} />
        </div>
        
        <div className="border-t pt-4 mt-2">
          <div className="flex justify-between">
            <p className="font-medium">Tarif horaire</p>
            <p className="font-medium">{powerBank.pricePerHour.toFixed(2)} CHF/h</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Paiement automatique selon votre consommation réelle
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerBankInfo;
