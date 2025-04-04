
import axios from 'axios';
import { toast } from 'sonner';

// Define your Blynk server and auth token details
const BLYNK_SERVER = 'https://blynk.cloud';
const BLYNK_API_VERSION = 'v1';

interface BlynkConfig {
  serverUrl: string;
  authToken: string;
}

class BlynkService {
  private config: BlynkConfig;
  
  constructor(config: BlynkConfig) {
    this.config = config;
  }
  
  // Get the base URL for API calls
  private getBaseUrl(): string {
    return `${this.config.serverUrl}/${BLYNK_API_VERSION}/${this.config.authToken}`;
  }
  
  // Read pin data
  async readPin(pin: string): Promise<any> {
    try {
      const response = await axios.get(`${this.getBaseUrl()}/get/${pin}`);
      return { success: true, value: response.data };
    } catch (error: any) {
      console.error(`Erreur lors de la lecture du pin ${pin}:`, error);
      return { success: false, error: error.message };
    }
  }
  
  // Write value to a pin
  async writePin(pin: string, value: string | number): Promise<any> {
    try {
      const response = await axios.get(`${this.getBaseUrl()}/update/${pin}?value=${value}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error(`Erreur lors de l'écriture sur le pin ${pin}:`, error);
      toast.error(`Impossible de mettre à jour le pin ${pin}`);
      return { success: false, error: error.message };
    }
  }
  
  // Get device data
  async getDeviceData(): Promise<any> {
    try {
      const response = await axios.get(`${this.getBaseUrl()}/project`);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Erreur lors de la récupération des données de l\'appareil:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Get device status (online/offline)
  async getDeviceStatus(): Promise<any> {
    try {
      const response = await axios.get(`${this.getBaseUrl()}/isHardwareConnected`);
      return { 
        success: true, 
        isOnline: response.data === true || response.data === 'true' 
      };
    } catch (error: any) {
      console.error('Erreur lors de la vérification du statut de l\'appareil:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export an instance with default config
const defaultConfig: BlynkConfig = {
  serverUrl: BLYNK_SERVER,
  authToken: 'YOUR_DEFAULT_AUTH_TOKEN' // Replace with your default token
};

export const blynkService = new BlynkService(defaultConfig);

// Factory function to create Blynk service with custom config
export const createBlynkService = (config: Partial<BlynkConfig>): BlynkService => {
  return new BlynkService({
    ...defaultConfig,
    ...config
  });
};
