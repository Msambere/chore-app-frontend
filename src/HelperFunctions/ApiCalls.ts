import axios from "axios";
import UserData from "~/types/Response/UserData";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { MissionRequest } from "~/types/Request/MissionRequest";
import MissionResponse from "~/types/Response/MissionResponse";
import SignupFormInputs from "~/types/Forms/SignupFormInputs";
import RewardResponse from "~/types/Response/RewardResponse";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

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

export const createNewChoreApiCall = (
  userId: number,
  newChoreData: ChoreRequest,
): Promise<ChoreResponse> => {
  console.log(newChoreData);
  return axios
    .post(`${VITE_APP_BACKEND_URL}/users/${userId}/chores`, newChoreData)
    .then((response) => {
      return response.data;
    });
};

export const createNewRewardApiCall = (
  userId: number,
  newRewardData: RewardRequest,
): Promise<RewardResponse> => {
  console.log(newRewardData);
  return axios
    .post(`${VITE_APP_BACKEND_URL}/users/${userId}/rewards`, newRewardData)
    .then((response) => {
      return response.data;
    });
};

export const getExistngUserApiCall = (username: string): Promise<UserData> => {
  return axios
    .get(`${VITE_APP_BACKEND_URL}/users/${username}`)
    .then((response) => {
      return response.data;
    });
};

export const updateChoreCompletionApiCall = (
  missionId: number,
  choreId: number,
): Promise<MissionChoreResponse> => {
  return axios
    .patch(`${VITE_APP_BACKEND_URL}/missionchores`, null, {
      params: { missionId, choreId },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Error updating chore completion: ${error}`);
    });
};

export const updateMissionApiCall = (
  missionId: number,
  totalUnredeemedPoints: number,
  timeElapsed: number,
): Promise<MissionResponse> => {
  return axios
    .patch(`${VITE_APP_BACKEND_URL}/missions/${missionId}`, {
      totalUnredeemedPoints,
      timeElapsed,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Error updating mission data: ${error}`);
    });
};

export const deleteEntityApiCall = (
  entityType: string,
  entityId: number,
): Promise<string> => {
  return axios
    .delete(`${VITE_APP_BACKEND_URL}/${entityType}/${entityId}`)
    .then((response) => {
      return response.data.message;
    });
};

export const updateEntityApiCall = (
  entityType: string,
  entityId: number,
  requestBody: ChoreRequest | RewardRequest,
) => {
  return axios
    .patch(`${VITE_APP_BACKEND_URL}/${entityType}/${entityId}`, requestBody)
    .then((response) => {
      console.log(response.data.message);
      return response.data;
    });
};
