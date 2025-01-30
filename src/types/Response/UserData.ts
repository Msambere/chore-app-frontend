import ChoreResponse from "~/types/Response/ChoreResponse";
import MissionResponse from "~/types/Response/MissionResponse";
import RewardResponse from "~/types/Response/RewardResponse";

export default interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  chores: ChoreResponse[];
  missions: MissionResponse[];
  rewards: RewardResponse[];
}
