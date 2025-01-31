import React, { JSX } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface TotalPointsEarnedProps {
  pointTotal: number;
}

const TotalPointsEarned = ({
  pointTotal,
}: TotalPointsEarnedProps): JSX.Element => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#e0e0e0",
        borderRadius: 1,
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Total Points Earned</Typography>
      <Typography variant="h4">{pointTotal} pts</Typography>
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress variant="determinate" value={pointTotal % 100} />
      </Box>
    </Box>
  );
};

export default TotalPointsEarned;
