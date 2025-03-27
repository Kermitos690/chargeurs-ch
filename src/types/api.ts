
export interface PowerBank {
  id: string;
  serialNumber: string;
  batteryLevel: number;
  status: 'available' | 'rented' | 'maintenance' | 'charging';
  capacity: number;
}

export interface Station {
  id: string;
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  availablePowerBanks: number;
  totalSlots: number;
  status: 'online' | 'offline' | 'maintenance';
}

export interface Rental {
  id: string;
  userId: string;
  powerBankId: string;
  startTime: string;
  endTime?: string;
  startStationId: string;
  endStationId?: string;
  status: 'active' | 'completed' | 'cancelled';
  cost?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeRental?: Rental;
  rentalHistory?: Rental[];
  subscriptionType?: 'basic' | 'premium' | 'enterprise';
  paymentMethod?: {
    type: string;
    lastFour?: string;
    expiryDate?: string;
  };
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  duration: 'monthly' | 'yearly';
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  method: string;
  description: string;
}
