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

          {userData.rewards.length > 0 ? (
            userData.rewards.map((reward) => (
              <SingleReward
                key={reward.rewardId}
                reward={reward}
                setUserData={setUserData}
              />
            ))
          ) : (
            <div>
              {" "}
              <h2>
                Uh oh, looks like you don&#39;t have any rewards. Click the
                button below to make some!
              </h2>
            </div>
          )}
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
