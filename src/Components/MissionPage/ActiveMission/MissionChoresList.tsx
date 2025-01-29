import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

interface MissionChoresListProps {
  chores?: { title: string }[];
}

const MissionChoresList = ({ chores = [] }: MissionChoresListProps) => {
  return (
    <Box sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 1, height: "100%" }}>
      <Typography variant="h6">List of Chores:</Typography>
      <List>
        {chores.length > 0 ? (
          chores.map((chore, index) => (
            <ListItem key={index}>{chore.title}</ListItem>
          ))
        ) : (
          <Typography color="textSecondary">No chores available</Typography>
        )}
      </List>
    </Box>
  );
};

export default MissionChoresList;
