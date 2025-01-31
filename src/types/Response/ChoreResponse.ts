export default interface ChoreResponse {
  message?: string | null;
  title: string;
  description: string;
  recurrence: string;
  category: string;
  duration: number;
  difficulty: number;
  userId: number;
  choreId?: number;
}
