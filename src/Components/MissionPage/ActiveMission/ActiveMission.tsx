import React from "react";
import { Box, Typography, Button, Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import Rewards from "./Rewards";

interface ActiveMissionProps {
  chores: { title: string }[];
  rewards: { name: string }[];
}
import {ReactElement, useState} from "react";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
// import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

const ActiveMission = (props: MissionChoresProps): ReactElement<string> => {
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(props.missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  // need a useState for progress too

  return <h1>This is were the Active Mission dashboard components go.</h1>;
};ActiveMissionProps) => {
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
interface MissionChoresProps {
  missionChores: MissionChoreResponse[];
}
const ActiveMission = (props: MissionChoresProps): ReactElement<string> => {
  const [missionChores, setMissionChores] = useState<MissionChoreResponse[]>(props.missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  // need a useState for progress too

  return <h1>This is were the Active Mission dashboard components go.</h1>;
};

export default ActiveMission;
