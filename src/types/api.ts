
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

// Update User interface with required fields
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  subscriptionType?: 'basic' | 'premium' | 'enterprise';
  subscription?: string; // For backward compatibility
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

// Update Rental interface with station-related fields
export interface Rental {
  id: string;
  userId: string;
  powerBankId: string;
  startTime: any;
  endTime?: any;
  status: 'active' | 'completed' | 'cancelled';
  stationStartId: string;
  stationEndId?: string;
  startStationId?: string; // For backward compatibility
  endStationId?: string;   // For backward compatibility
  cost?: number;           // For backward compatibility
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
