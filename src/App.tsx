import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "./Components/LoginPage/LoginView.tsx";
import SideBar from "./Components/SideBar/SideBar.tsx";
import UserProfileView from "./Components/UserProfilePage/UserProfileView.tsx";
import ChoresView from "./Components/ChoresPage/ChoresView.tsx";
import RewardsView from "./Components/RewardsPage/RewardsView.tsx";
import MissionView from "./Components/MissionPage/MissionView.tsx";
import {getTestString, getUserDataAPICall} from "./Helper Functions/ApiCalls.ts";


function App() {
  const [message, setMessage] = useState<string>("");
  const [userData, setUserData] = useState([]) //Add typing
  const [userId, setUserID] = useState<number>(1);


  useEffect(() => {
    getTestString().then((message ) => {
      setMessage(message);
    });
    getUserDataAPICall(userId).then((data) =>{
      // default user is 1 for now
      setUserData(data);
      console.log(userData);
    })
}, []);

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
