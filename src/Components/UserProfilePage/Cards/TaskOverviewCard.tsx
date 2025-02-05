import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MissionResponse from "~/types/Response/MissionResponse";

interface TaskOverviewCardProps {
  completionRate: number;
  recentMissions: MissionResponse[];
}

export default function TaskOverviewCard({
  completionRate,
  recentMissions,
}: TaskOverviewCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
      <CardContent>
        <Typography variant="h5">Task Overview</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Task Progress */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {completionRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed tasks
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Task Timeline */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              Task Timeline
            </Typography>
            <List dense>
              {recentMissions.length > 0 ? (
                recentMissions.map((mission) => (
                  <ListItem key={mission.missionId} sx={{ py: 0 }}>
                    <ListItemText
                      primary={mission.category || "General Mission"}
                      secondary={`Started: ${new Date(
                        mission.dateStarted,
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No missions available
                </Typography>
              )}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
