import ChoreResponse from "~/types/ChoreResponse";
import MissionResponse from "~/types/MissionResponse";

export default interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  chores: ChoreResponse[];
  missions: MissionResponse[];
}
