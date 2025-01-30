import axios from "axios";
import UserData from "~/types/Response/UserData";
import ChoreResponse from "~/types/Response/ChoreResponse";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import RewardResponse from "~/types/Response/RewardResponse";


const VITE_APP_BACKEND_URL: string = import.meta.env.VITE_APP_BACKEND_URL;

export const getTestString = (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export async function getUserInfo(userName: string): Promise<UserData> {
  const response = await fetch(`${VITE_APP_BACKEND_URL}/users/${userName}`);
  return await response.json();
}

export async function createChore(
  userName: string,
  chore: ChoreResponse,
): Promise<UserData> {
  const response = await fetch(
    `${VITE_APP_BACKEND_URL}/users/${userName}/chores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chore),
    },
  );
  return await response.json();
}

// Fetch MissionChores
export const getMissionChores = async (): Promise<MissionChoreResponse[]> => {
  try {
    const response = await axios.get<MissionChoreResponse[]>(
      `${VITE_APP_BACKEND_URL}/missionchores`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mission chores:", error);
    throw new Error("Failed to load mission chores.");
  }
};

// Fetch Rewards for a User
export const getRewards = async (
  userId: number,
): Promise<RewardResponse[]> => {
  try {
    const response = await axios.get<RewardResponse[]>(
      `${VITE_APP_BACKEND_URL}/users/${userId}/rewards`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw new Error("Failed to load rewards.");
  }
};
