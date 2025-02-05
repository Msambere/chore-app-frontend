import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import CalendarCard from "~/Components/UserProfilePage/Cards/CalanderCard";
import BadgesCard from "~/Components/UserProfilePage/Cards/BadgesCard";
import MissionResponse from "~/types/Response/MissionResponse";

interface CalendarAndBadgesCardProps {
  missions: MissionResponse[];
}

export default function CalendarAndBadgesCard({
  missions,
}: CalendarAndBadgesCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Calendar
        </Typography>
        <Box sx={{ width: "100%", height: "18rem", overflow: "hidden" }}>
          <CalendarCard missions={missions} />
        </Box>
        <Divider sx={{ my: 1 }} />
        <BadgesCard />
      </CardContent>
    </Card>
  );
}
