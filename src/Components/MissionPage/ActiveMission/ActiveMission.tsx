import React, { useState, JSX } from "react";
import { Button, Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import TimeProgress from "~/Components/MissionPage/ActiveMission/TimeProgress";
import axios from "axios";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
}

const ActiveMission = ({ missionChores }: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(missionChores);
  const [pointTotal, setPointTotal] = useState(0);

  // Handle chore completion
  const toggleChoreCompletion = (
    choreId: number,
    missionId: number,
    points: number,
    completed: boolean,
  ) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.choreId === choreId ? { ...chore, completed } : chore,
      ),
    );

    setPointTotal((prevPoints) =>
      completed ? prevPoints + points : Math.max(prevPoints - points, 0),
    );

    axios
      .patch(`${import.meta.env.VITE_APP_BACKEND_URL}/missionchores`, null, {
        params: { missionId, choreId },
      })
      .then((response) => {
        console.log(`Chore ${choreId} status updated.`);
        console.log("Backend Response:", response.data);
      })
      .catch((err) => console.error("Error updating chore completion:", err));
  };

  return (
    <Grid container spacing={2}>
      {/* Left Panel - Chores List */}
      <Grid size={4}>
        <MissionChoresList
          chores={chores}
          onToggleChore={toggleChoreCompletion}
        />
      </Grid>

      {/* Middle Panel - Time & Progress */}
      <Grid size={4}>
        <TimeProgress chores={chores} />
      </Grid>

      {/* Right Panel - Total Points Earned */}
      <Grid size={4}>
        <TotalPointsEarned pointTotal={pointTotal} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Redeem Reward
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActiveMission;
