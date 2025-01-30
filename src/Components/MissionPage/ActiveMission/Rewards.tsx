import React from "react";
import { Box, Typography } from "@mui/material";

interface RewardProps {
  totalChores: number;
  completedChores: number;
}

function Rewards({ totalChores, completedChores }: RewardProps) {
  const progressPercentage =
    totalChores > 0 ? (completedChores / totalChores) * 100 : 0;

  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%", position: "relative" }}>
      <Typography variant="h6">Rewards:</Typography>
      <Box
        sx={{
          width: 10,
          height: "100px",
          bgcolor: "#ddd",
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: `${progressPercentage}%`,
            bgcolor: "#4caf50",
            position: "absolute",
            bottom: 0,
            transition: "height 0.3s ease-in-out",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {Array.from({ length: totalChores }, (_, index) => (
          <Box
            key={index}
            sx={{
              width: 30,
              height: 30,
              bgcolor: index < completedChores ? "#ffc107" : "#ddd",
              borderRadius: "50%",
              transition: "background-color 0.3s ease-in-out",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Rewards;