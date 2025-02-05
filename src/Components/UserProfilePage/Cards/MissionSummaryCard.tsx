import { Card, CardContent, Typography, Divider, Grid2 } from "@mui/material";
import {
  CalendarMonth,
  Category,
  Checklist,
  AccessTime,
  Star,
} from "@mui/icons-material";
import MissionResponse from "~/types/Response/MissionResponse";
import { formatTime } from "~/Helper Functions/FormatTime";

interface MissionSummaryProps {
  mission?: MissionResponse;
  missionsLength: number;
}

const MissionSummaryCard = ({
  mission,
  missionsLength,
}: MissionSummaryProps) => {
  if (!mission) {
    return (
      <Typography variant="body2" color="text.secondary">
        No missions available
      </Typography>
    );
  }

  const completedChores = mission.missionChores.filter((m) => m.completed);
  const completedChoresPoints = completedChores.reduce(
    (acc, chore) => acc + chore.points,
    0,
  );

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Last Mission Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container spacing={2}>
          <Grid2 size={6} display="flex" alignItems="center">
            <CalendarMonth sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body1">
              <strong>Mission Number:</strong> {missionsLength}
            </Typography>
          </Grid2>

          <Grid2 size={6} display="flex" alignItems="center">
            <Category sx={{ mr: 1, color: "secondary.main" }} />
            <Typography variant="body1">
              <strong>Category:</strong> {mission.category ?? "Any"}
            </Typography>
          </Grid2>

          <Grid2 size={6} display="flex" alignItems="center">
            <Checklist sx={{ mr: 1, color: "green" }} />
            <Typography variant="body1">
              <strong>Completed Chores:</strong> {completedChores.length} /{" "}
              {mission.missionChores.length}
            </Typography>
          </Grid2>

          <Grid2 size={6} display="flex" alignItems="center">
            <AccessTime sx={{ mr: 1, color: "orange" }} />
            <Typography variant="body1">
              <strong>Time Elapsed:</strong> {formatTime(mission.timeElapsed)}
            </Typography>
          </Grid2>

          <Grid2 size={6} display="flex" alignItems="center">
            <Star sx={{ mr: 1, color: "gold" }} />
            <Typography variant="body1">
              <strong>Total Points Earned:</strong> {completedChoresPoints}
            </Typography>
          </Grid2>

          <Grid2 size={6} display="flex" alignItems="center">
            <Star sx={{ mr: 1, color: "gray" }} />
            <Typography variant="body1">
              <strong>Total Unredeemed Points:</strong>{" "}
              {mission.totalUnredeemedPoints ?? 0}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default MissionSummaryCard;
