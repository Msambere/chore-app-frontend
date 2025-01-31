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
  const [userData, setUserData] = useState<UserData>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    if (!userName) return;
    getUserInfo(userName).then((response) => {
      setUserData(response);
    });
  }, [userName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserProfileView userData={userData} />} />
          <Route
            path="/Login"
            element={
              <LoginView userNameSetter={setUserName} userName={userName} />
            }
          />
          <Route
            path="/Signup"
            element={<SignupView userNameSetter={setUserName} />}
          />
          <Route
            path="/Chores"
            element={<ChoresListView chores={userData?.chores ?? []} />}
          />
          <Route
            path="/Chores/create"
            element={
              <ChoreFormStatic userData={userData} setUserData={setUserData} />
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

// {
//   message: "User created successfully",
//     userId: 2,
//   firstName: "User",
//   lastName: "One",
//   email: "thefirst@users.com",
//   username: "theOG11",
//   chores: [],
//   missions: [],
//   rewards: [],
// }