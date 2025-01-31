import React from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface MissionChoresListProps {
  chores: MissionChoreResponse[];
  onToggleChore: (choreId: number, missionId: number, points: number, completed: boolean) => void;
}

const MissionChoresList = ({
  chores,
  onToggleChore,
}: MissionChoresListProps) => {
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
                size="small"
                color={chore.completed ? "secondary" : "primary"}
                onClick={() =>
                  onToggleChore(chore.choreId, chore.missionId, chore.points, !chore.completed)
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