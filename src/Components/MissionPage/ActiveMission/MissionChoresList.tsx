import React from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface MissionChoresListProps {
  chores: MissionChoreResponse[];
  onCompleteChore: (choreId: number, missionId: number, points: number, completed: boolean) => void;
}

const MissionChoresList = ({ chores, onCompleteChore }: MissionChoresListProps) => {
  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        List of Chores:
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {chores.length > 0 ? (
          chores.map((chore) => (
            <ListItem
              key={chore.choreId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: "whitesmoke",
                boxShadow: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: chore.completed ? "gray" : "black",
                }}
              >
                {chore.choreName} - {chore.duration} mins ({chore.points} pts)
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={chore.completed}
                onClick={() =>
                  onCompleteChore(chore.choreId, chore.missionId, chore.points)
                }
              >
                {chore.completed ? "Completed" : "Mark Complete"}
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography color="textSecondary">No chores available</Typography>
        )}
      </List>
    </Box>
  );
};

export default MissionChoresList;