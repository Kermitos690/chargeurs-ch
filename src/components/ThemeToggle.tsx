
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile } from '@/services/firebase/profile';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { user } = useAuth();

  // Détecter le mode préféré du système
  useEffect(() => {
    // Vérifier le localStorage d'abord
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      return;
    }
    
    // Sinon utiliser la préférence du système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  // Mettre à jour le thème
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Enregistrer la préférence dans le profil utilisateur si connecté
    if (user) {
      try {
        await updateUserProfile(user.uid, {
          preferences: {
            darkMode: newMode
          }
        });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du mode:", error);
      }
    }
  };

  return (
    <Toggle 
      pressed={isDarkMode} 
      onPressedChange={toggleTheme}
      aria-label="Basculer le mode sombre"
      title={isDarkMode ? "Mode clair" : "Mode sombre"}
      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
    >
      {isDarkMode ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
}
