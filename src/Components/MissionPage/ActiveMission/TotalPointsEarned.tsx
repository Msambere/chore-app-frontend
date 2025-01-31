import React, { JSX } from "react";
import { Box, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

interface TotalPointsEarnedProps {
  pointTotal: number;
  maxPoints: number;
}

const TotalPointsEarned = ({
  pointTotal,
  maxPoints,
}: TotalPointsEarnedProps): JSX.Element => {
  const progress = (pointTotal / maxPoints) * 100;

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#e0e0e0",
        borderRadius: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Total Points Earned
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        {pointTotal} pts
      </Typography>

      {/* Container for Progress Bar & Icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          mt: 2,
        }}
      >
        {/* Vertical Progress Bar */}
        <Box
          sx={{
            height: "200px",
            width: "25px",
            bgcolor: "#d3d3d3",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${progress}%`,
              bgcolor: "green",
              transition: "height 0.5s ease-in-out",
            }}
          />
        </Box>

        {/* Reward Icons Moved Outside the Bar */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "30px", ml: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEventsIcon sx={{ color: "Green", fontSize: 40 }} />
            <Typography variant="caption">Grand Reward</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CardGiftcardIcon sx={{ color: "blue", fontSize: 40 }} />
            <Typography variant="caption">Big Reward</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CardGiftcardIcon sx={{ color: "red", fontSize: 40 }} />
            <Typography variant="caption">Starter Reward</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TotalPointsEarned;
