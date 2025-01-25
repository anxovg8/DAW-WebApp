export interface Reminder {
  id: string;
  title: string;
  description: string;
  datetime: Date;
  type: 'medication' | 'appointment' | 'activity';
  completed: boolean;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'mental' | 'general';
}