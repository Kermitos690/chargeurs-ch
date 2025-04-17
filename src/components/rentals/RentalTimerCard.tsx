
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Battery, MapPin, Clock, CreditCard } from 'lucide-react';
import { formatCurrency, calculateRentalFees } from '@/services/qrPayment';

interface Rental {
  id: string;
  powerBankId: string;
  startTime: string;
  startStationId?: string;
  endStationId?: string;
  endTime?: string;
  status: string;
  maxAmount?: number;
  finalAmount?: number;
}

interface RentalTimerCardProps {
  rental: Rental;
  onReturn: () => void;
}

const RentalTimerCard: React.FC<RentalTimerCardProps> = ({ rental, onReturn }) => {
  const [elapsedTime, setElapsedTime] = useState('');
  const [currentCost, setCurrentCost] = useState(0);
  
  useEffect(() => {
    // Mise à jour de l'affichage de temps écoulé toutes les minutes
    const updateElapsedTime = () => {
      const start = new Date(rental.startTime);
      const now = new Date();
      const diffInMs = now.getTime() - start.getTime();
      
      // Calcul du temps écoulé
      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setElapsedTime(`${hours}h ${minutes}min`);
      
      // Calcul du coût actuel
      const { totalAmount } = calculateRentalFees(rental.startTime);
      setCurrentCost(totalAmount);
    };
    
    // Exécuter immédiatement pour l'affichage initial
    updateElapsedTime();
    
    // Mettre à jour toutes les minutes
    const interval = setInterval(updateElapsedTime, 60000);
    
    return () => clearInterval(interval);
  }, [rental.startTime]);
  
  return (
    <Card className="overflow-hidden border-t-4 border-t-primary">
      <CardHeader className="py-4 bg-primary/5">
        <CardTitle className="text-base flex items-center gap-1">
          <Battery size={18} />
          Powerbank #{rental.powerBankId.slice(-4)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-muted-foreground" />
            <span>Station de départ: {rental.startStationId || 'Inconnue'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-muted-foreground" />
            <span>Début: {new Date(rental.startTime).toLocaleString()}</span>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Temps écoulé</span>
              <span className="text-primary font-bold">{elapsedTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Coût actuel</span>
              <span className="text-primary font-bold">{formatCurrency(currentCost)}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Pré-autorisation: {formatCurrency(rental.maxAmount || 0)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t py-3 bg-muted/30">
        <Button onClick={onReturn} className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Restituer la powerbank
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RentalTimerCard;
