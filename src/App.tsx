import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "~/Components/LoginPage/LoginView";
import SideBar from "~/Components/SideBar/SideBar";
import UserProfileView from "~/Components/UserProfilePage/UserProfileView";
import ChoresView from "~/Components/ChoresPage/ChoresView";
import RewardsView from "~/Components/RewardsPage/RewardsView";
import MissionView from "~/Components/MissionPage/MissionView";
import ChoreResponse from "~/types/ChoreResponse";

const VITE_APP_BACKEND_URL: string = import.meta.env.VITE_APP_BACKEND_URL;

const getTestString = (): Promise<string> => {
  return axios.get(`${VITE_APP_BACKEND_URL}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export async function getChores(userId: number): Promise<ChoreResponse[]> {
  try {
    const response = await fetch(
      `${VITE_APP_BACKEND_URL}/users/${userId}/chores`,
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function App() {
  const [message, setMessage] = useState("");
  const [chores, setChores] = useState<ChoreResponse[]>([]);
  const [userId] = useState<number>(1);

  useEffect(() => {
    getChores(userId).then((chores) => setChores(chores));
    getTestString().then((message) => {
      setMessage(message);
    });
  }, [userId, chores]);

  return (
    <>
      <h1>{message}</h1>
      <h1> Side bar goes here</h1>
      <SideBar />
      {/*Create this component. Use <NavLink to="...">...</NavLink>/>  for buttons */}
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginView />} />
          {/*users see this page when they go to site, will be redirected if they are already logged in.*/}
          <Route path="/UserProfile" element={<UserProfileView />} />
          <Route path="/Chores" element={<ChoresView chores={chores} />} />
          <Route path="/Rewards" element={<RewardsView />} />
          <Route path="/Mission" element={<MissionView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
