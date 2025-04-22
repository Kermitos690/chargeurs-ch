
export const handleRegistrationError = (error: any): string => {
  console.error("Registration error:", error);
  
  if (error instanceof Error) {
    switch (error.message) {
      case 'email-already-in-use':
        return "Cette adresse email est déjà utilisée par un autre compte";
      case 'technical_error':
        return "Une erreur technique est survenue. Veuillez réessayer.";
      case 'registration_failed':
        return "Échec de création du compte. Veuillez réessayer.";
    }
  }
  
  // Handle Supabase specific errors
  const errorMsg = error.message?.toLowerCase() || '';
  
  if (errorMsg.includes('already registered') || 
      errorMsg.includes('email already exists') ||
      errorMsg.includes('user already registered') ||
      errorMsg.includes('duplicate key')) {
    return "Cette adresse email est déjà utilisée par un autre compte";
  }
  
  if (errorMsg.includes('network')) {
    return "Problème de connexion réseau. Veuillez vérifier votre connexion.";
  }
  
  if (errorMsg.includes('database') || errorMsg.includes('db error')) {
    return "Erreur de base de données. Veuillez réessayer dans quelques instants.";
  }
  
  return "Une erreur inattendue est survenue. Veuillez réessayer plus tard.";
};
