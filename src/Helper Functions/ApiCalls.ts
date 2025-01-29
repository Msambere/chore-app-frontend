import axios from "axios";
import UserData from "~/types/UserData";

const VITE_APP_BACKEND_URL: string = import.meta.env.VITE_APP_BACKEND_URL;

export const getTestString = (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export async function getUserInfo(userId: number): Promise<UserData> {
  const response = await fetch(`${VITE_APP_BACKEND_URL}/users/${userId}`);
  return await response.json();
}
