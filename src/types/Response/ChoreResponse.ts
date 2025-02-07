export default interface ChoreResponse {
  [key: string]: string | number;
  message: string;
  title: string;
  description: string;
  recurrence: string;
  category: string;
  duration: number;
  difficulty: number;
  userId: number;
  choreId: number;
}
