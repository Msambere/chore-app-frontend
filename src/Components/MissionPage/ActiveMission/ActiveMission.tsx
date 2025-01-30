import React, { useState, useEffect, JSX } from "react";
import {
  Box,
  Typography,
  Button,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import axios from "axios";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
  userId: number;
}

const ActiveMission = ({ missionChores, userId }: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timeLimit = 60;

  const remainingTime = Math.max(timeLimit - timeElapsed, 0);
  const completedChores = chores.filter((chore) => chore.completed).length;
  const totalChores = chores.length;
  const progress = totalChores > 0 ? (completedChores / totalChores) * 100 : 0;

  // Timer to track elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle chore completion
  const completeChore = (choreId: number, missionId: number, points: number) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.choreId === choreId ? { ...chore, completed: true } : chore,
      ),
    );
    setPointTotal((prevPoints) => prevPoints + points);

    axios
      .patch(`${import.meta.env.VITE_APP_BACKEND_URL}/missionchores`, null, {
        params: { missionId, choreId },
      })
      .then(() => console.log(`Chore ${choreId} marked as completed.`))
      .catch((err) => console.error("Error updating chore completion:", err));
  };

  return (
    <Grid container spacing={2}>
      {/* Left Panel - Chores List */}
      <Grid size={4}>
        <MissionChoresList chores={chores} onCompleteChore={completeChore} />
      </Grid>

      {/* Middle Panel - Time & Progress */}
      <Grid size={4}>
        <Box
          sx={{
            p: 3,
            bgcolor: "#e0e0e0",
            borderRadius: 1,
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Time & Progress:</Typography>
          <Typography variant="h4">Remaining Time: {remainingTime}m</Typography>

          <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={80}
              thickness={5}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="textSecondary"
              >
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
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