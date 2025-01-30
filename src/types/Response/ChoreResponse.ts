export default interface ChoreResponse {
  choreId: number;
  title: string;
  description: string;
  recurrence: string;
  category: string;
  duration: number;
  difficulty: number;
  userId: number;
  message: string | null;
}
