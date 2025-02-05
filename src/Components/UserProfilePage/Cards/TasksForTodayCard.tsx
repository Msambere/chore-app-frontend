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

interface TasksForTodayCardProps {
  tasks: ChoreResponse[];
}

export default function TasksForTodayCard({ tasks }: TasksForTodayCardProps) {
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
            <Typography variant="h5">Tasks for Today</Typography>
            <Divider sx={{ my: 1 }} />
            <List dense>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <ListItem key={task.choreId}>
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No tasks available
                </Typography>
              )}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
