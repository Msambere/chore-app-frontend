export default interface MissionChoreResponse {
  message: string | null;
  userId: number;
  choreId: number;
  choreName: string;
  completed: boolean;
}
