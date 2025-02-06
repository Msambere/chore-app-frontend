import { Box, Button, Grid2 as Grid } from "@mui/material";
import { Link as RouterLink } from "react-router";
import React, { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";
import SingleReward from "~/Components/RewardsPage/SingleReward";

interface RewardsProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function RewardList({ userData, setUserData }: RewardsProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Rewards List
          </Box>
          {userData.rewards.map((reward) => (
            <SingleReward
              key={reward.rewardId}
              reward={reward}
              setUserData={setUserData}
            />
          ))}
          <Button
            variant="outlined"
            to={"/Rewards/create"}
            component={RouterLink}
          >
            Add New Reward
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
