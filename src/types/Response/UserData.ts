import ChoreResponse from "~/types/Response/ChoreResponse";
import MissionResponse from "~/types/Response/MissionResponse";
import RewardResponse from "~/types/Response/RewardResponse";

export default interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  chores: ChoreResponse[];
  missions: MissionResponse[];
  rewards: RewardResponse[];
  message: string | null;
}
