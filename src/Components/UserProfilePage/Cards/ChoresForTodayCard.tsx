import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";

interface ChoresForTodayCardProps {
  chores: ChoreResponse[];
}

export default function ChoresForTodayCard({
  chores,
}: ChoresForTodayCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">Chores for today</Typography>
            <Divider sx={{ my: 1 }} />
            <List dense>
              {chores.length > 0 ? (
                chores.map((task) => (
                  <ListItem key={task.choreId}>
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No chores available
                </Typography>
              )}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
