
import axios from 'axios';
import { ApiResponse, PowerBank, Station, Rental, User, Subscription, Payment } from '@/types/api';

const API_BASE_URL = 'https://apifox.com/apidoc/shared/4855b8fe-4c43-48f6-8bd6-37cc29b98fe5';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PowerBank endpoints
export const getPowerBanks = async (): Promise<ApiResponse<PowerBank[]>> => {
  try {
    const response = await api.get('/powerbanks');
    return response.data;
  } catch (error) {
    console.error('Error fetching power banks:', error);
    return { success: false, error: 'Failed to fetch power banks' };
  }
};

export const getPowerBankById = async (id: string): Promise<ApiResponse<PowerBank>> => {
  try {
    const response = await api.get(`/powerbanks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching power bank with ID ${id}:`, error);
    return { success: false, error: 'Failed to fetch power bank details' };
  }
};

// Station endpoints
export const getStations = async (): Promise<ApiResponse<Station[]>> => {
  try {
    const response = await api.get('/stations');
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    return { success: false, error: 'Failed to fetch stations' };
  }
};

export const getStationById = async (id: string): Promise<ApiResponse<Station>> => {
  try {
    const response = await api.get(`/stations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching station with ID ${id}:`, error);
    return { success: false, error: 'Failed to fetch station details' };
  }
};

export const getStationsByLocation = async (latitude: number, longitude: number, radius: number): Promise<ApiResponse<Station[]>> => {
  try {
    const response = await api.get('/stations/nearby', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby stations:', error);
    return { success: false, error: 'Failed to fetch nearby stations' };
  }
};

// Rental endpoints
export const getUserRentals = async (userId: string): Promise<ApiResponse<Rental[]>> => {
  try {
    const response = await api.get(`/users/${userId}/rentals`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rentals for user ${userId}:`, error);
    return { success: false, error: 'Failed to fetch rental history' };
  }
};

export const getRentalById = async (rentalId: string): Promise<ApiResponse<Rental>> => {
  try {
    const response = await api.get(`/rentals/${rentalId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rental with ID ${rentalId}:`, error);
    return { success: false, error: 'Failed to fetch rental details' };
  }
};

export const startRental = async (userId: string, stationId: string, powerBankId: string): Promise<ApiResponse<Rental>> => {
  try {
    const response = await api.post('/rentals/start', { userId, stationId, powerBankId });
    return response.data;
  } catch (error) {
    console.error('Error starting rental:', error);
    return { success: false, error: 'Failed to start rental' };
  }
};

export const endRental = async (rentalId: string, stationId: string): Promise<ApiResponse<Rental>> => {
  try {
    const response = await api.post(`/rentals/${rentalId}/end`, { stationId });
    return response.data;
  } catch (error) {
    console.error(`Error ending rental ${rentalId}:`, error);
    return { success: false, error: 'Failed to end rental' };
  }
};

// User endpoints
export const getUserProfile = async (userId: string): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile for ${userId}:`, error);
    return { success: false, error: 'Failed to fetch user profile' };
  }
};

export const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile for ${userId}:`, error);
    return { success: false, error: 'Failed to update user profile' };
  }
};

export const registerUser = async (userData: Partial<User>): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: 'Failed to register user' };
  }
};

export const loginUser = async (email: string, password: string): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Failed to login' };
  }
};

// Subscription endpoints
export const getSubscriptions = async (): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get('/subscriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return { success: false, error: 'Failed to fetch subscriptions' };
  }
};

export const subscribeUser = async (userId: string, subscriptionId: string): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post(`/users/${userId}/subscribe`, { subscriptionId });
    return response.data;
  } catch (error) {
    console.error(`Error subscribing user ${userId}:`, error);
    return { success: false, error: 'Failed to subscribe user' };
  }
};

// Payment endpoints
export const getUserPayments = async (userId: string): Promise<ApiResponse<Payment[]>> => {
  try {
    const response = await api.get(`/users/${userId}/payments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payments for user ${userId}:`, error);
    return { success: false, error: 'Failed to fetch payment history' };
  }
};

export const addPaymentMethod = async (userId: string, paymentMethod: any): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post(`/users/${userId}/payment-methods`, paymentMethod);
    return response.data;
  } catch (error) {
    console.error(`Error adding payment method for user ${userId}:`, error);
    return { success: false, error: 'Failed to add payment method' };
  }
};

export const removePaymentMethod = async (userId: string, paymentMethodId: string): Promise<ApiResponse<User>> => {
  try {
    const response = await api.delete(`/users/${userId}/payment-methods/${paymentMethodId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing payment method for user ${userId}:`, error);
    return { success: false, error: 'Failed to remove payment method' };
  }
};

// Generic error handler for API requests
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Request Failed:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
