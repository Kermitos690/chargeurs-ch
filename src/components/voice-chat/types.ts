
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  audio?: string;
  timestamp: Date;
}
