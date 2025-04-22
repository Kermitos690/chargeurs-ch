
interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const validateRegistrationData = ({
  password,
  confirmPassword,
  acceptTerms
}: RegistrationData): string | null => {
  if (password !== confirmPassword) {
    return "Les mots de passe ne correspondent pas";
  }
  
  if (!acceptTerms) {
    return "Vous devez accepter les conditions d'utilisation";
  }
  
  if (password.length < 6) {
    return "Le mot de passe est trop faible (minimum 6 caractères)";
  }
  
  return null;
};
