import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

export default interface MissionResponse {
  message: string | null;
  missionId: number;
  category: string;
  recurrence: string;
  totalUnredeemedPoints: number;
  dateStarted: string;
  timeLimit: number;
  timeElapsed: number;
  userId: number;
  missionChores: MissionChoreResponse[];
}
