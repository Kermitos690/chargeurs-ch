
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
}

export interface ProfileResponse {
  success: boolean;
  data?: any;
  error?: string;
}
