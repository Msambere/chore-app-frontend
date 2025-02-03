import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginView from "~/Components/LoginPage/LoginView";
import UserProfileView from "~/Components/UserProfilePage/UserProfileView";
import ChoresListView from "~/Components/ChoresPage/ChoresListView";
import RewardsView from "~/Components/RewardsPage/RewardsView";
import MissionView from "~/Components/MissionPage/MissionView";
import UserData from "~/types/Response/UserData";
import { Layout } from "~/Components/Layout/Layout";
import SignupView from "~/Components/LoginPage/Signup";
import ChoreFormStatic from "~/Components/ChoresPage/ChoreFormStatic";
import RewardFormStatic from "~/Components/RewardsPage/RewardFormStatic";
import { getExistngUserApiCall } from "~/Helper Functions/ApiCalls";

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
        <Route path="/" element={<Layout setUserData={setUserData} />}>
          {/*<Route index element={<UserProfileView userData={userData} />} />*/}
          <Route
            path="/UserProfile"
            element={<UserProfileView userData={userData} />}
          />
          <Route
            index
            // path="/Login"
            element={<LoginView setUserData={setUserData} />}
          />
          <Route
            path="/Signup"
            element={<SignupView setUserData={setUserData} />}
          />
          <Route
            path="/Chores"
            element={<ChoresListView userData={userData} />}
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
              <RewardsView userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/Rewards/create"
            element={
              <RewardFormStatic userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/Mission"
            element={
              <MissionView userData={userData} setUserData={setUserData} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
