import { Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import React from "react";

interface PointsSummaryCardProps {
  currentPointBalance: number;
  averagePointsPerMission: number;
  totalPointsEarned: number;
}

export default function PointsSummaryCard({
  currentPointBalance,
  averagePointsPerMission,
  totalPointsEarned,
}: PointsSummaryCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, mt: 0 }}>
      <CardContent>
        <Box sx={{ p: 1, borderRadius: 2, textAlign: "center" }}>
          <Grid2 container spacing={2}>
            <Grid2
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight="bold" color="primary">
                {currentPointBalance}
              </Typography>
            </Grid2>
            <Grid2 size={8} textAlign="left">
              <Typography variant="body2" color="text.secondary">
                <strong>Current Point Balance</strong>
              </Typography>
            </Grid2>

            {/* Avg. Points per Mission */}
            <Grid2
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight="bold" color="secondary">
                {averagePointsPerMission.toFixed(1)}
              </Typography>
            </Grid2>
            <Grid2 size={8} textAlign="left">
              <Typography variant="body2" color="text.secondary">
                <strong>Avg. Points per Mission</strong>
              </Typography>
            </Grid2>

            {/* Total Points Earned */}
            <Grid2
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight="bold" color="gold">
                {totalPointsEarned}
              </Typography>
            </Grid2>
            <Grid2 size={8} textAlign="left">
              <Typography variant="body2" color="text.secondary">
                <strong>Total Points Earned</strong>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
}
