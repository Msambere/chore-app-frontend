import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "~/Components/LoginPage/LoginView";
import UserProfileView from "~/Components/UserProfilePage/UserProfileView";
import ChoresListView from "~/Components/ChoresPage/ChoresListView";
import RewardsView from "~/Components/RewardsPage/RewardsView";
import MissionView from "~/Components/MissionPage/MissionView";
import UserData from "~/types/Response/UserData";
import { Layout } from "~/Components/Layout/Layout";
import { getUserInfo } from "~/Helper Functions/ApiCalls";
import ChoreFormComponent from "./Components/ChoresPage/ChoreFormComponent";

function App() {
  const [userData, setUserData] = useState<UserData>();
  const [userId] = useState<string>("user1");

  useEffect(() => {
    getUserInfo(userId).then((response) => {
      setUserData(response);
    });
  }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginView />} />
          {/*users see this page when they go to site, will be redirected if they are already logged in.*/}
          <Route path="/UserProfile" element={<UserProfileView />} />
          <Route
            path="/Chores"
            element={<ChoresListView chores={userData?.chores ?? []} />}
          />
          <Route
            path="/Chores/create"
            element={<ChoreFormComponent userName={userData?.username ?? ""} />}
          />
          <Route path="/Rewards" element={<RewardsView />} />
          <Route path="/Mission" element={<MissionView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
