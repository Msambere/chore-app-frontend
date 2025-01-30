import axios from "axios";
import UserData from "~/types/Response/UserData";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { MissionRequest } from "~/types/Request/MissionRequest";
import MissionResponse from "~/types/Response/MissionResponse";
import SignupFormInputs from "~/types/Forms/SignupFormInputs";

const VITE_APP_BACKEND_URL: string = import.meta.env.VITE_APP_BACKEND_URL;

export const getTestString = (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const createNewMissionApiCall = (
  userId: number,
  newMissionData: MissionRequest,
): Promise<MissionResponse> => {
  console.log(newMissionData);
  return axios
    .post(`${VITE_APP_BACKEND_URL}/users/${userId}/missions`, newMissionData)
    .then((response) => {
      return response.data;
    });
};

export async function getUserInfo(userName: string): Promise<UserData> {
  const response = await fetch(`${VITE_APP_BACKEND_URL}/users/${userName}`);
  return await response.json();
}

export function createUser(user: SignupFormInputs): Promise<Response> {
  return fetch(`${VITE_APP_BACKEND_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
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
