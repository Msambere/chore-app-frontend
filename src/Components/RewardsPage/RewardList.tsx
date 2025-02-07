import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid2 as Grid, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router";
import UserData from "~/types/Response/UserData";
import SingleReward from "~/Components/RewardsPage/SingleReward";
import RewardResponse from "~/types/Response/RewardResponse";

interface RewardsProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function RewardList({ userData, setUserData }: RewardsProps) {
  const rewards = userData.rewards;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        pb: 6, // space at bottom
      }}
    >
      {/* Header Container */}
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          backdropFilter: "blur(8px)",
          maxWidth: 1200,
          mx: "auto",
          mt: 3,
          mb: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
          Rewards List
        </Typography>

        {rewards.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Uh oh, looks like you do not have any rewards. Tap the “+” to create
            one!
          </Typography>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Manage your rewards below!
          </Typography>
        )}
      </Box>

      {/* Grid of Rewards */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Grid container spacing={3}>
          {rewards.map((reward: RewardResponse) => (
            <Grid key={reward.rewardId} size={4}>
              <SingleReward reward={reward} setUserData={setUserData} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating FAB for creating a new reward */}
      <Fab
        color="primary"
        component={RouterLink}
        to="/Rewards/create"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 4,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
