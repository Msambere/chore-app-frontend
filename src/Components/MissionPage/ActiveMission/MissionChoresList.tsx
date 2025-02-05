import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface MissionChoresListProps {
  chores: MissionChoreResponse[];
  onToggleChore: (
    choreId: number,
    missionId: number,
    points: number,
    completed: boolean,
  ) => void;
}

const MissionChoresList = ({
  chores,
  onToggleChore,
}: MissionChoresListProps) => {
  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        List of Chores:
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {chores.length > 0 ? (
          chores.map((chore) => (
            <ListItem key={chore.choreId}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, width: "100%" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <Typography>
                      {chore.choreName} - {chore.duration} mins ({chore.points}{" "}
                      pts)
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      color={chore.completed ? "secondary" : "primary"}
                      onClick={() =>
                        onToggleChore(
                          chore.choreId,
                          chore.missionId,
                          chore.points,
                          !chore.completed,
                        )
                      }
                      sx={{
                        minWidth: "100px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        bgcolor: chore.completed ? "#d3d3d3" : "#1976d2",
                        color: chore.completed ? "gray" : "white",
                      }}
                    >
                      {chore.completed ? "UNDO" : "MARK COMPLETE"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Typography color="textSecondary">No chores available</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default MissionChoresList;
