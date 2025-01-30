import React from "react";
import { Box, Typography } from "@mui/material";
import RewardResponse from "~/types/Response/RewardResponse";

interface RewardsProps {
  rewards: RewardResponse[];
}

const Rewards = ({ rewards }: RewardsProps) => {
  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
      <Typography variant="h6">Rewards:</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {rewards.map((reward, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                bgcolor: reward.inMission ? "#ffc107" : "#9e9e9e",
                borderRadius: "50%",
                mr: 1,
              }}
            />
            <Typography>{reward.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Rewards;
