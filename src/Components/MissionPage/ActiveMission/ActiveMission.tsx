import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import Rewards from "./Rewards";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import RewardResponse from "~/types/Response/RewardResponse";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
  rewards: RewardResponse[];
}

const ActiveMission = ({
  missionChores,
  rewards,
}: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(
    missionChores || [],
  );
  const [pointTotal, setPointTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Calculate progress based on completed chores
  const completedChores = chores.filter((chore) => chore.completed).length;
  const progress =
    chores.length > 0 ? (completedChores / chores.length) * 100 : 0;

  // Mark chore as completed
  const completeChore = (choreId: number) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.choreId === choreId ? { ...chore, completed: true } : chore,
      ),
    );
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
          <Typography variant="h4">Remaining Time: {timeElapsed}m</Typography>

          {/* Progress Bar */}
          <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={80}
              thickness={5}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
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

      {/* Right Panel - Rewards */}
      <Grid size={4}>
        <Rewards rewards={rewards} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Redeem Reward
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActiveMission;
