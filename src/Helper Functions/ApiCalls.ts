import axios from "axios";

const VITE_APP_BACKEND_URL : string = import.meta.env.VITE_APP_BACKEND_URL

export const getTestString= (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`)
    .then((response) => {
      console.log(response.data)
      return response.data;
    });
};