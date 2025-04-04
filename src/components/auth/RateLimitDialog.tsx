
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RateLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RateLimitDialog = ({ open, onOpenChange }: RateLimitDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-amber-500" />
            Limite de tentatives atteinte
          </DialogTitle>
          <DialogDescription>
            Pour des raisons de sécurité, Firebase limite le nombre de réinitialisations de mot de passe pour une adresse email.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3">
          <p>
            Veuillez essayer l'une des solutions suivantes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attendez environ une heure avant de réessayer</li>
            <li>Contactez le support si vous avez un besoin urgent d'accès</li>
            <li>Essayez de vous connecter avec votre ancien mot de passe</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Compris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
