import React, { JSX } from "react";
import {
  Box,
  Card,
  LinearProgress,
  Typography,
  useTheme,
  CardContent,
  Stack,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RewardResponse from "~/types/Response/RewardResponse";

interface TotalPointsEarnedProps {
  totalUnredeemPoints: number;
  maxPoints: number;
  rewards: RewardResponse[];
}

const TotalPointsEarned = ({
  totalUnredeemPoints,
  maxPoints,
  rewards,
}: TotalPointsEarnedProps): JSX.Element => {
  const theme = useTheme();

  const progress = (totalUnredeemPoints / maxPoints) * 100;
  const redeemedRewards = rewards.filter((r) => r.inMission);

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Total Points
        </Typography>

        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {totalUnredeemPoints}
          <Typography component="span" variant="body1">
            {" "}
            pts
          </Typography>
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 2,
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              backgroundColor:
                progress === 100 ? "success.main" : "primary.main",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            0
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {maxPoints} pts
          </Typography>
        </Box>

        {/* Render an icon for each redeemed reward */}
        {redeemedRewards.length > 0 && (
          <Box mt={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Redeemed Rewards
            </Typography>
            <Stack direction="row" spacing={1}>
              {redeemedRewards.slice(0, 4).map((reward) => (
                <Stack
                  key={reward.rewardId}
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: theme.palette.grey[100],
                  }}
                >
                  <EmojiEventsIcon sx={{ color: theme.palette.warning.main }} />
                  <Typography variant="body2" color="text.secondary">
                    {reward.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalPointsEarned;
