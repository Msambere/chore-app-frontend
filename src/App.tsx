import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "~/Components/LoginPage/LoginView";
import UserProfileView from "~/Components/UserProfilePage/UserProfileView";
import ChoresListView from "~/Components/ChoresPage/ChoresListView";
import RewardsView from "~/Components/RewardsPage/RewardsView";
import MissionView from "~/Components/MissionPage/MissionView";
import UserData from "~/types/Response/UserData";
import { Layout } from "~/Components/Layout/Layout";
import { getUserInfo } from "~/Helper Functions/ApiCalls";
import SignupView from "~/Components/LoginPage/Signup";
import ChoreFormStatic from "~/Components/ChoresPage/ChoreFormStatic";
import RewardFormStatic from "~/Components/RewardsPage/RewardFormStatic";

function App() {
  const [userData, setUserData] = useState<UserData>({
    message: "",
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "Not logged in",
    chores: [],
    missions: [],
    rewards: [],
  });
  const [username, setUsername] = useState<string>(userData.username);

  useEffect(() => {
    if (username != "Not logged in") {
      getUserInfo(username).then((response) => {
        setUserData(response);
      });
    }
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setUserData={setUserData} />}>
          {/*<Route index element={<UserProfileView userData={userData} />} />*/}
          <Route
            path="/UserProfile"
            element={<UserProfileView userData={userData} />}
          />
          <Route
            index
            // path="/Login"
            element={
              <LoginView
                userNameSetter={setUsername}
                userName={username}
                userData={userData}
              />
            }
          />
          <Route
            path="/Signup"
            element={
              <SignupView userNameSetter={setUsername} userData={userData} />
            }
          />
          <Route
            path="/Chores"
            element={<ChoresListView userData={userData} />}
          />
          <Route
            path="/Chores/create"
            element={
              <ChoreFormStatic userData={userData!} setUserData={setUserData} />
            }
            // element={<ChoreFormComponent userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/Rewards"
            element={
              <RewardsView userData={userData!} setUserData={setUserData} />
            }
          />
          <Route
            path="/Rewards/create"
            element={
              <RewardFormStatic
                userData={userData!}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/Mission"
            element={
              <MissionView userData={userData!} setUserData={setUserData} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
