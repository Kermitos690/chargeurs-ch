
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

// Add Station interface
export interface Station {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  availablePowerBanks: number;
  totalSlots: number;
  status: 'online' | 'offline' | 'maintenance';
  description?: string;
  imageUrl?: string;
}

// Add ApiResponse interface for consistent API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Add Rental interface
export interface Rental {
  id: string;
  userId: string;
  powerBankId: string;
  startTime: any;
  endTime?: any;
  status: 'active' | 'completed' | 'cancelled';
  stationStartId: string;
  stationEndId?: string;
  amount?: number;
}

// Add Payment interface
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  type: 'rental' | 'subscription';
  createdAt: any;
  rentalId?: string;
  subscriptionId?: string;
}
