
// Profile data interfaces
export interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  firstName?: string;
  lastName?: string;
  // Ajout d'un champ pour suivre la dernière modification
  updatedAt?: Date;
  // Ajout des préférences utilisateur
  preferences?: {
    darkMode?: boolean;
    useGeolocation?: boolean;
  };
}

export interface ProfileResponse {
  success: boolean;
  data?: any;
  error?: string;
}
