
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface ShippingFormProps {
  shippingDetails: ShippingDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ shippingDetails, handleInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de livraison</CardTitle>
        <CardDescription>
          Veuillez saisir vos coordonnées pour la livraison
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input 
              id="firstName" 
              name="firstName" 
              value={shippingDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input 
              id="lastName" 
              name="lastName" 
              value={shippingDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Adresse *</Label>
          <Input 
            id="address" 
            name="address" 
            value={shippingDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Ville *</Label>
            <Input 
              id="city" 
              name="city" 
              value={shippingDetails.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal *</Label>
            <Input 
              id="postalCode" 
              name="postalCode" 
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone *</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            value={shippingDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingForm;
