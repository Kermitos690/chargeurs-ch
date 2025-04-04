export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  features: string[];
  duration: 'monthly' | 'yearly';
}

// Update the PowerBank interface
export interface PowerBank {
  id: string;
  serialNumber: string;
  batteryLevel: number;
  capacity: number;
  status: 'available' | 'rented' | 'maintenance' | 'charging';
  lastUpdated?: any;
}

// Add User interface
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  subscriptionType?: 'basic' | 'premium' | 'enterprise';
  createdAt?: any;
}
