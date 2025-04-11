
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
  subscriptionType?: string;
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
  capacity?: number;
  serialNumber?: string;
  lastUpdated?: string;
}

export interface Station {
  id: string;
  name: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  availablePowerBanks?: number;
  totalSlots?: number;
  description?: string;
  imageUrl?: string;
  distance?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  paymentIntentId?: string;
  createdAt: string | Date;
}

export interface AvailableTimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  establishmentName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  type: "video" | "phone";
  createdAt: Date;
}
