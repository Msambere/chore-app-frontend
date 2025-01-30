import React from "react";
import { Box, Typography, List, ListItem, Checkbox } from "@mui/material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface MissionChoresListProps {
  chores: MissionChoreResponse[];
  onCompleteChore: (choreId: number) => void;
}

const MissionChoresList = ({
  chores,
  onCompleteChore,
}: MissionChoresListProps) => {
  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
      <Typography variant="h6">List of Chores:</Typography>
      <List>
        {chores.length > 0 ? (
          chores.map((chore) => (
            <ListItem key={chore.choreId}>
              <Checkbox
                checked={chore.completed}
                onChange={() => onCompleteChore(chore.choreId)}
              />
              {chore.choreName}
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
