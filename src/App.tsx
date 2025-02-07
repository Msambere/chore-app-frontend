import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "~/Components/Layout/Layout";
import LoginView from "~/Components/LoginPage/LoginView";
import UserProfileView from "~/Components/UserProfilePage/UserProfileView";
import RewardsView from "~/Components/RewardsPage/RewardsView";
import MissionView from "~/Components/MissionPage/MissionView";
import SignupView from "~/Components/LoginPage/Signup";
import ChoresView from "~/Components/ChoresPage/ChoresView";
import NewRewardForm from "~/Components/RewardsPage/NewRewardForm";
import NewChoreForm from "~/Components/ChoresPage/NewChoreForm";
import UserData from "~/types/Response/UserData";
import { getExistngUserApiCall } from "~/Helper Functions/ApiCalls";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import PrivateRoutes from "~/Components/Layout/PrivateRoutes";

function App() {
  const [userData, setUserData] = useState<UserData>({
    message: "",
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    chores: [],
    missions: [],
    rewards: [],
  });
  const [startMission, setStartMission] = useState<boolean>(false);
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(
    [],
  );
  useEffect(() => {
    console.log(localStorage.getItem("username"));
    const loggedInUser: string | null = localStorage.getItem("username");
    if (loggedInUser && loggedInUser !== "") {
      getExistngUserApiCall(loggedInUser).then((response: UserData) =>
        setUserData(response),
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout setUserData={setUserData} userData={userData} />}
        >
          <Route index element={<LoginView setUserData={setUserData} />} />
          <Route path="/Signup" element={<SignupView />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/UserProfile"
              element={
                <UserProfileView
                  userData={userData}
                  setUserData={setUserData}
                  setStartMission={setStartMission}
                  setMissionChores={setMissionChores}
                />
              }
            />
            <Route
              path="/Chores"
              element={
                <ChoresView userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/Chores/create"
              element={
                <NewChoreForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/Rewards"
              element={
                <RewardsView userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/Rewards/create"
              element={
                <NewRewardForm userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/Mission"
              element={
                <MissionView
                  userData={userData}
                  setUserData={setUserData}
                  setStartMission={setStartMission}
                  startMission={startMission}
                  missionChores={missionChores}
                  setMissionChores={setMissionChores}
                />
              }
            />
            <Route path="*" element={<h1> 404: There is nothing here!</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
