
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
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
