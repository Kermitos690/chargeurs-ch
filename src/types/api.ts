
// Add any types that were previously exported from Firebase

export interface User {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  role?: string;
  createdAt?: string | Date;
  photoURL?: string;
  displayName?: string;
}

export interface Subscription {
  id?: string;
  name: string;
  description?: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  priceId?: string;
}

export interface Rental {
  id: string;
  powerBankId: string;
  startTime: string;
  startStationId?: string;
  endStationId?: string;
  endTime?: string;
  status: string;
  maxAmount?: number;
  finalAmount?: number;
  cost?: number;
}

export interface PowerBank {
  id: string;
  stationId?: string;
  batteryLevel?: number;
  code: string;
  status?: string;
}

export interface Station {
  id: string;
  name: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
}
