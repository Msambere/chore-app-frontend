import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "~/Components/Layout/Layout";

import { ThemeProvider, CssBaseline } from "@mui/material";

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
import { makeAppTheme } from "~/Theme/theme";

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

  const [mode, setMode] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("themeMode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    // Whenever mode changes, store in localStorage
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => makeAppTheme(mode), [mode]);

  // Check if user is logged in
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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                setUserData={setUserData}
                userData={userData}
                mode={mode}
                toggleMode={toggleMode}
              />
            }
          >
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
            <Route index element={<LoginView setUserData={setUserData} />} />
            <Route
              path="/Signup"
              element={<SignupView setUserData={setUserData} />}
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
