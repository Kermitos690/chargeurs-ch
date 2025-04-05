
export interface Message {
  id: string;
  created_at: string;
  content: string;
  user_id: string;
  room_id: string;
  user_name?: string; // Nom d'utilisateur optionnel pour l'affichage
  user_avatar?: string; // Avatar optionnel pour l'affichage
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  is_private: boolean;
}
