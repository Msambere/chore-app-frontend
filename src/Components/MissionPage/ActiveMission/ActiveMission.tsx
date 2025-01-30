import React from "react";
import { Box, Typography, Button, Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import Rewards from "./Rewards";

interface ActiveMissionProps {
  chores: { title: string }[];
  rewards: { name: string }[];
}

const ActiveMission = ({ chores, rewards }: ActiveMissionProps) => {
  return (
    <Grid container spacing={2}>
      {/* Left Panel - Chores List */}
      <Grid size={4}>
        <MissionChoresList chores={chores} />
      </Grid>

      {/* Middle Panel - Time & Progress */}
      <Grid size={4}>
        <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
          <Typography variant="h6">Time & Progress:</Typography>
          <Typography variant="h4">Remaining Time: 00:15m</Typography>
          <Typography variant="h6">Progress: 20%</Typography>
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
