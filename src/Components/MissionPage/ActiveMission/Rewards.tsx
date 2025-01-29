import React from "react";
import { Box, Typography } from "@mui/material";

interface Reward {
  name: string;
}

interface RewardsProps {
  rewards: Reward[];
}

function Rewards({ rewards }: RewardsProps) {
  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
      <Typography variant="h6">Rewards:</Typography>
      {rewards.length > 0 ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {rewards.map((reward, index) => (
            <Box
              key={index}
              sx={{
                width: 30,
                height: 30,
                bgcolor: "#ffc107",
                borderRadius: "50%",
              }}
            />
          ))}
        </Box>
      ) : (
        <Typography color="textSecondary">No rewards available</Typography>
      )}
    </Box>
  );
}
export default Rewards;
