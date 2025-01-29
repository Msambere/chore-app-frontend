import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "./Components/LoginPage/LoginView.tsx";
import SideBar from "./Components/SideBar/SideBar.tsx";
import UserProfileView from "./Components/UserProfilePage/UserProfileView.tsx";
import ChoresView from "./Components/ChoresPage/ChoresView.tsx";
import RewardsView from "./Components/RewardsPage/RewardsView.tsx";
import MissionView from "./Components/MissionPage/MissionView.tsx";

const VITE_APP_BACKEND_URL : string = import.meta.env.VITE_APP_BACKEND_URL

const getTestString= (): Promise<string> => {
    return axios.get(`${VITE_APP_BACKEND_URL}`)
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
};

function App() {
  const [message, setMessage] = useState("");


  useEffect(() => {
    getTestString().then((message ) => {
      setMessage(message);
  })
}, [])
    // Testing for gIthub
  return (
    <>
      <h1>{message}</h1>
      <h1> Side bar goes here</h1>
        <SideBar/>
        {/*Create this component. Use <NavLink to="...">...</NavLink>/>  for buttons */}
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginView />} />
          {/*users see this page when they go to site, will be redirected if they are already logged in.*/}
          <Route path="/UserProfile" element={<UserProfileView />} />
          <Route path="/Chores" element={<ChoresView />} />
          <Route path="/Rewards" element={<RewardsView />} />
          <Route path="/Mission" element={<MissionView />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
