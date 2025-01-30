import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

export default interface MissionResponse {
  missionId: number;
  recurrence: string;
  category: string;
  dateStarted: string;
  timeLimit: number;
  userId: number;
  timeElapsed: number;
  message: string | null;
  missionChores: MissionChoreResponse[];
}
