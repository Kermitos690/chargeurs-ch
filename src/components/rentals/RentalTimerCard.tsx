
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rental } from '@/types/api';
import { Clock, Battery, CreditCard } from 'lucide-react';
import { calculateRentalFees, formatCurrency } from '@/services/qrPayment';

interface RentalTimerCardProps {
  rental: Rental;
  onReturn?: () => void;
}

const RentalTimerCard: React.FC<RentalTimerCardProps> = ({ rental, onReturn }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDuration = (startTime: string) => {
    const start = new Date(startTime);
    const diffInMs = currentTime.getTime() - start.getTime();
    
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const getRentalInfo = () => {
    return calculateRentalFees(rental.startTime, 2);
  };
  
  const { totalAmount, breakdown } = getRentalInfo();
  
  const toggleBreakdown = () => {
    setShowBreakdown(prev => !prev);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/10">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Battery className="h-5 w-5" />
          Location en cours
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center items-center mb-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Durée</p>
              <div className="text-3xl font-bold font-mono">
                {formatDuration(rental.startTime)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted rounded-md">
            <div>
              <p className="text-sm text-muted-foreground">Montant actuel</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(totalAmount)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleBreakdown}>
              {showBreakdown ? 'Masquer' : 'Détails'}
            </Button>
          </div>
          
          {showBreakdown && (
            <div className="text-sm space-y-1 bg-muted/50 p-3 rounded-md">
              <h4 className="font-medium mb-2">Calcul des frais</h4>
              <pre className="whitespace-pre-wrap text-xs">{breakdown}</pre>
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              Début: {new Date(rental.startTime).toLocaleString('fr-FR')}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 mr-1" />
            <span>
              Pré-autorisation: {formatCurrency(rental.maxAmount || 30)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 pt-4">
        {onReturn && (
          <Button className="w-full" onClick={onReturn}>
            Retourner cette powerbank
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RentalTimerCard;
